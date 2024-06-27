'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// lib
import { Adjacent, Result } from '@/lib/types'
import { CategoryModel, ICategory } from '@/lib/models/category.model'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { debug, handleError } from '@/lib/utils/dev'
import { deepClone, generateUniqueSlug, validateData } from '@/lib/utils'
// import { deleteFiles } from '@/lib/actions/image.action'
import { findPrev, findNext } from '@/lib/utils'
import { getUser } from '@/lib/actions/user.action'
import { IImage, ImageModel } from '@/lib/models/image.model'
import { IProject, ProjectModel } from '@/lib/models/project.model'
import { ProjectFormData, projectSchema } from '@/lib/types/zod'
import { SortOptions } from '@/lib/types/enums'
import { UserModel, IUser } from '@/lib/models/user.model'
import { routes } from '@/navigation'

// CREATE
// Create project
export async function createProject(
	projectData: ProjectFormData
): Promise<Result<IProject>> {
	try {
		await connectToDatabase()

		const validationErrors = validateData(projectSchema, projectData)
		if (validationErrors) {
			return {
				success: false,
				errors: validationErrors,
			}
		}

		const user: IUser = await getCurrentUser()
		const category: ICategory | null = await CategoryModel.findOne({
			label: projectData.category,
		})

		const slug = await generateUniqueSlug(ProjectModel, projectData.title)

		const newProject: IProject = await ProjectModel.create({
			user,
			slug,
			title: projectData.title,
			info: projectData.info,
			category,
		})

		debug(1, 0, newProject)
		revalidatePath(routes.PROJECTS)
		return { success: true, data: deepClone(newProject) }
	} catch (error) {
		handleError(error)
		return { success: false, errors: ['An error occurred'] }
	}
}

// READ
// Get current user
export async function getCurrentUser() {
	try {
		const { userId } = auth()
		const currentUser: IUser = await getUser(userId)

		debug(0)
		return deepClone(currentUser)
	} catch (error) {
		handleError(error)
	}
}

// Get projects
export async function getProjects(searchParams: any, profile: boolean) {
	try {
		await connectToDatabase()

		const projectQuery: any = {}

		if (profile) {
			const user: IUser = await getCurrentUser()
			projectQuery.user = user._id
		} else if (searchParams.user) {
			const user = await UserModel.findOne({ username: searchParams.user })
			if (user) {
				projectQuery.user = user._id
			}
		}

		if (searchParams.title) {
			projectQuery.title = { $regex: searchParams.title, $options: 'i' }
		}
		if (searchParams.category) {
			const category = await CategoryModel.findOne({
				label: searchParams.category,
			})
			if (category) {
				projectQuery.category = category._id
			} else {
				throw new Error('Category not found')
			}
		}

		const sortOptions: { [key: string]: any } = {
			[SortOptions.TITLE]: { title: 1 },
			[SortOptions.USER]: { user: 1, title: 1 },
			[SortOptions.DATE]: { _id: 1 },
		}

		const sort: any =
			sortOptions[searchParams.sort] || sortOptions[SortOptions.TITLE]

		const projects = await ProjectModel.find(projectQuery)
			.populate('user', '_id username photo')
			.populate('category')
			.collation({ locale: 'pl', strength: 1 })
			.sort(sort)

		debug(3, 0, projects)
		return deepClone(projects)
	} catch (error) {
		handleError(error)
	}
}

// Get project by slug
export async function getProjectBySlug({
	slug,
	searchParams,
	profile,
}: {
	slug: string
	searchParams: any
	profile: boolean
}): Promise<Adjacent<IProject>> {
	try {
		const projects: IProject[] = await getProjects(searchParams, profile)

		const currentIndex = projects.findIndex(
			(project: IProject) => project.slug === slug
		)
		if (currentIndex === -1) {
			throw new Error('Unauthorized access to this project.')
		}
		const currentProject = await ProjectModel.findOne({ slug })
			.populate('category')
			.populate('images')
		const prevProject = findPrev<IProject>(projects, currentIndex)
		const nextProject = findNext<IProject>(projects, currentIndex)

		const adjacentProjects = {
			prev: deepClone(prevProject),
			current: deepClone(currentProject),
			next: deepClone(nextProject),
		}

		debug(3, 0, adjacentProjects)
		return adjacentProjects
	} catch (error) {
		handleError(error)
		return { prev: null, current: null, next: null }
	}
}

// UPDATE
// Update project
export async function updateProject(
	slug: string,
	projectData: ProjectFormData
) {
	try {
		await connectToDatabase()

		const updatedSlug = await generateUniqueSlug(
			ProjectModel,
			projectData.title,
			slug
		)

		const category: ICategory | null = await CategoryModel.findOne({
			label: projectData.category,
		})

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{
				slug: updatedSlug,
				title: projectData.title,
				info: projectData.info,
				category,
			},
			{ new: true }
		)

		debug(4, 0, updatedProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(updatedProject)
	} catch (error) {
		handleError(error)
	}
}

// Add image to project
export async function addImageToProject(
	slug: string,
	url: string,
	name: string
) {
	try {
		await connectToDatabase()
		const image = await ImageModel.create({ url, name })

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ $push: { images: image._id } }
		)

		debug(4, 9, updatedProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(updatedProject)
	} catch (error) {
		handleError(error)
	}
}

// Remove image from project
export async function removeImageFromProject(slug: string, imageId: string) {
	try {
		await connectToDatabase()

		const deletedImage = await ImageModel.findByIdAndDelete(imageId)
		if (!deletedImage) {
			throw new Error('Image not found')
		}
		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ $pull: { images: imageId } }
		)
		debug(5, 0, updatedProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(updatedProject)
	} catch (error) {
		handleError(error)
	}
}

// DELETE
// Delete project
export async function deleteProject(projectId: string) {
	try {
		await connectToDatabase()

		const project = await ProjectModel.findById(projectId).populate('images')

		if (!project) {
			throw new Error('Project not found')
		}

		// Extract image IDs and keys
		const imagesIds = project.images.map((image: IImage) => image._id)
		// const imagesKeys = project.images.map((image: IImage) => image.key)

		// Delete images from the database
		await ImageModel.deleteMany({ _id: { $in: imagesIds } })

		// // Delete image files from storage if they exist
		// if (imagesKeys.length > 0) {
		// 	const deletedFiles = await deleteFiles(imagesKeys)
		// 	debug(0, 0, deletedFiles)
		// }

		// Delete the project
		const deletedProject = await ProjectModel.findByIdAndDelete(projectId)

		debug(5, 0, deletedProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(deletedProject)
	} catch (error) {
		handleError(error)
	}
}
