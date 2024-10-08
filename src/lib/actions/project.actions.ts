'use server'
// modules
import { revalidatePath } from 'next/cache'
// lib
import {
	deepClone,
	generateUniqueSlug,
	validateData,
	findPrev,
	findNext,
} from '@/lib/utils'
import { Adjacent, ProjectSearchParams } from '@/lib/types'
import { CategoryModel, ICategory } from '@/lib/models/category.model'
import { connectToDatabase } from '@/lib/utils/services'
import { debug, handleError } from '@/lib/utils/dev'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { IImage, ImageModel } from '@/lib/models/image.model'
import { IProject, ProjectModel } from '@/lib/models/project.model'
import { ProjectFormValues, projectFormSchema } from '@/lib/types/zod'
import { removeImage, removeImages } from '@/lib/actions/image.actions'
import { routes } from '@/lib/constants/paths'
import { UserModel, IUser } from '@/lib/models/user.model'
import { SortOptions } from '@/lib/types/enums'
import { txt } from '@/lib/constants/texts'

// CREATE
// Create project
export async function createProject(
	projectValues: ProjectFormValues
): Promise<Result<IProject>> {
	try {
		await connectToDatabase()

		const validationErrors = validateData(projectFormSchema, projectValues)
		if (validationErrors) {
			return {
				success: false,
				errors: validationErrors,
			}
		}

		const user: IUser = await getCurrentUser()
		const category: ICategory | null = await CategoryModel.findOne({
			label: projectValues.category,
		})

		const slug = await generateUniqueSlug(ProjectModel, projectValues.title)

		const newProject: IProject = await ProjectModel.create({
			user,
			slug,
			title: projectValues.title,
			info: projectValues.info,
			category,
		})

		debug(1, 0, newProject)
		revalidatePath(routes.PROJECTS)
		return { success: true, data: deepClone(newProject) }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// READ
// Get projects
export async function getProjects(
	searchParams: ProjectSearchParams,
	profile: boolean
): Promise<DataResult<IProject[]>> {
	try {
		await connectToDatabase()
		const projectQuery: any = {}

		// Sort
		const sortOptions: { [key: string]: any } = {
			[SortOptions.CUSTOM]: { order: 1 },
			[SortOptions.TITLE]: { title: 1 },
			[SortOptions.USER]: { user: 1, title: 1 },
			[SortOptions.DATE]: { _id: 1 },
		}

		let sortQuery: any = sortOptions[SortOptions.CUSTOM]

		if (searchParams.sort) {
			sortQuery = sortOptions[searchParams.sort]
		}

		// Title
		if (searchParams.title) {
			projectQuery.title = { $regex: searchParams.title, $options: 'i' }
		}

		// Category
		if (searchParams.category) {
			const category = await CategoryModel.findOne({
				label: searchParams.category,
			})
			if (category) {
				projectQuery.category = category._id
			} else {
				throw new Error(txt.errors.CATEGORY_NOT_FOUND)
			}
		}

		// Profile
		if (profile) {
			const user: IUser = await getCurrentUser()
			projectQuery.user = user._id
		} else if (searchParams.user) {
			const user = await UserModel.findOne({ username: searchParams.user })
			if (user) {
				projectQuery.user = user._id
			}
		}

		const projects = await ProjectModel.find(projectQuery)
			.populate('user', '_id username photo')
			.populate('category')
			.populate('cover')
			.collation({ locale: 'pl', strength: 1 })
			.sort(sortQuery)

		debug(3, 0, projects)
		return { success: true, data: deepClone(projects) }
	} catch (error) {
		return { success: false, data: [], errors: { error: handleError(error) } }
	}
}

// Get project by slug
export async function getProjectBySlug(
	slug: string,
	searchParams: ProjectSearchParams,
	profile: boolean
): Promise<DataResult<Adjacent<IProject>>> {
	try {
		await connectToDatabase()

		const { data: projects }: DataResult<IProject[]> = await getProjects(
			searchParams,
			profile
		)

		if (!projects) {
			return { success: true, data: { prev: null, current: null, next: null } }
		}

		const currentIndex = projects.findIndex(
			(project: IProject) => project.slug === slug
		)
		if (currentIndex === -1) {
			return {
				success: false,
				data: { prev: null, current: null, next: null },
				errors: { error: txt.errors.UNAUTHORIZED_ACCESS },
			}
		}
		const currentProject = await ProjectModel.findOne({ slug })
			.populate('user', '_id')
			.populate('category')
			.populate('images')
			.populate('cover')
		const prevProject = findPrev<IProject>(projects, currentIndex)
		const nextProject = findNext<IProject>(projects, currentIndex)

		const adjacentProjects = {
			prev: deepClone(prevProject),
			current: deepClone(currentProject),
			next: deepClone(nextProject),
		}

		debug(3, 0, adjacentProjects)
		return { success: true, data: adjacentProjects }
	} catch (error) {
		return {
			success: false,
			data: { prev: null, current: null, next: null },
			errors: { error: handleError(error) },
		}
	}
}

// UPDATE
// Update project
export async function updateProject(
	slug: string,
	projectValues: ProjectFormValues
): Promise<Result<IProject>> {
	try {
		await connectToDatabase()

		const updatedSlug = await generateUniqueSlug(
			ProjectModel,
			projectValues.title,
			slug
		)

		const category: ICategory | null = await CategoryModel.findOne({
			label: projectValues.category,
		})

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{
				slug: updatedSlug,
				title: projectValues.title,
				info: projectValues.info,
				category,
			},
			{ new: true }
		)

		debug(4, 0, updatedProject)
		revalidatePath(routes.PROJECTS)
		return { success: true, data: deepClone(updatedProject) }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// Add image to project
export async function addImageToProject({
	slug,
	publicID,
	name,
	url,
}: {
	slug: string
	publicID: string
	name: string
	url: string
}): Promise<Result<IImage>> {
	try {
		await connectToDatabase()
		const image = await ImageModel.create({ publicID, name, url })

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ $push: { images: image._id } },
			{ new: true }
		)

		debug(2, 9, updatedProject)
		revalidatePath(routes.PROFILE, 'layout')
		return { success: true, data: deepClone(image) }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// Update image in project
export async function updateImageInProject({
	image,
	publicID,
	name,
	url,
}: {
	image: IImage
	publicID: string
	name: string
	url: string
}): Promise<Result<IImage>> {
	try {
		await connectToDatabase()

		const updatedImage = await ImageModel.findByIdAndUpdate(
			image._id,
			{ publicID, url, name },
			{ new: true }
		)
		await removeImage(image.publicID)
		revalidatePath(routes.PROFILE, 'layout')
		debug(4, 9, updatedImage)
		return { success: true, data: deepClone(updatedImage) }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// Remove image from project
export async function removeImageFromProject(
	slug: string,
	image: IImage
): Promise<Result<IProject>> {
	try {
		await connectToDatabase()

		const deletedImage = await ImageModel.findByIdAndDelete(image._id)
		if (!deletedImage) {
			return { success: false, errors: { error: txt.errors.IMAGE_NOT_FOUND } }
		}
		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ $pull: { images: image._id } },
			{ new: true }
		)

		await removeImage(image.publicID)
		revalidatePath(routes.PROJECTS)
		debug(5, 9, updatedProject)
		return { success: true, data: deepClone(updatedProject) }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// Set project cover
export async function setProjectCover(
	slug: string,
	image: IImage
): Promise<Result<IProject>> {
	try {
		await connectToDatabase()

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{
				cover: image,
			},
			{ new: true }
		)
		revalidatePath(routes.PROFILE, 'layout')
		return { success: true, data: deepClone(updatedProject) }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// Remove project cover
export async function removeProjectCover(
	slug: string
): Promise<Result<IProject>> {
	try {
		await connectToDatabase()

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{
				cover: null,
			},
			{ new: true }
		)
		revalidatePath(routes.PROFILE, 'layout')
		return { success: true, data: deepClone(updatedProject) }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// Update project order
export async function updateProjectOrder(
	projects: { _id: string; order: number }[]
): Promise<Result<null>> {
	try {
		await connectToDatabase()

		const bulkOps = projects.map((project) => ({
			updateOne: {
				filter: { _id: project._id },
				update: { order: project.order },
			},
		}))

		await ProjectModel.bulkWrite(bulkOps)
		return { success: true }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// Update image order
export async function updateImageOrder(
	slug: string,
	reorderedImages: IImage[]
): Promise<Result<null>> {
	try {
		await connectToDatabase()

		await ProjectModel.findOneAndUpdate(
			{ slug },
			{
				images: reorderedImages,
			}
		)
		return { success: true }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}

// DELETE
// Delete project
export async function deleteProject(
	projectId: string
): Promise<Result<IProject>> {
	try {
		await connectToDatabase()

		const project = await ProjectModel.findById(projectId).populate('images')

		if (!project) {
			throw new Error(txt.errors.PROJECT_NOT_FOUND)
		}

		// Extract image IDs
		const imagesIds = project.images.map((image: IImage) => image._id)
		const imagesPublicIds = project.images.map(
			(image: IImage) => image.publicID
		)

		// Delete images from the database
		await ImageModel.deleteMany({ _id: { $in: imagesIds } })

		// Delete image files from storage
		if (imagesPublicIds.length > 0) {
			await removeImages(imagesPublicIds)
		}

		// Delete the project
		const deletedProject = await ProjectModel.findByIdAndDelete(projectId)

		debug(5, 0, deletedProject)
		revalidatePath(routes.PROFILE, 'layout')
		return { success: true, data: deepClone(deletedProject) }
	} catch (error) {
		return { success: false, errors: { error: handleError(error) } }
	}
}
