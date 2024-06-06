'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// lib
import { Adjacent } from '@/lib/types'
import { checkUserMode, deepClone, generateUniqueSlug } from '@/lib/utils'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { debug, handleError } from '@/lib/utils/dev'
import { findPrev, findNext } from '@/lib/utils'
import { getUser } from '@/lib/actions/user.action'
import { IImage, ImageModel } from '@/lib/models/image.model'
import { IProject, ProjectModel } from '@/lib/models/project.model'
import { IUser } from '@/lib/models/user.model'
import { ProjectFormData } from '@/lib/zod'
import { routes } from '@/navigation'
import { SortOptions } from '@/lib/types/enums'

// CREATE
// Create project
export async function createProject(projectData: ProjectFormData) {
	try {
		await connectToDatabase()

		const user: IUser = await getCurrentUser()
		const slug = await generateUniqueSlug(ProjectModel, projectData.title)

		const newProject = await ProjectModel.create({ user, slug, ...projectData })

		debug(3, 0, newProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(newProject)
	} catch (error) {
		handleError(error)
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
export async function getProjects(searchParams: any) {
	try {
		await connectToDatabase()

		const projectQuery: any = {}

		if (checkUserMode(searchParams)) {
			const currentUser: IUser = await getCurrentUser()
			projectQuery.user = currentUser._id
		} else if (searchParams.user) {
			projectQuery.user = searchParams.user
		}

		if (searchParams.title) {
			projectQuery.title = { $regex: searchParams.title, $options: 'i' }
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
			.sort(sort)

		debug(0, 0, projects)
		return deepClone(projects)
	} catch (error) {
		handleError(error)
	}
}

// Get project by slug
export async function getProjectBySlug({
	slug,
	searchParams,
}: {
	slug: string
	searchParams: any
}): Promise<Adjacent<IProject>> {
	try {
		const projects: IProject[] = await getProjects(searchParams)

		const currentIndex = projects.findIndex(
			(project: IProject) => project.slug === slug
		)
		const currentProject = await ProjectModel.findOne({ slug }).populate(
			'images'
		)
		const prevProject = findPrev<IProject>(projects, currentIndex)
		const nextProject = findNext<IProject>(projects, currentIndex)

		const adjacentProjects = {
			prev: deepClone(prevProject),
			current: deepClone(currentProject),
			next: deepClone(nextProject),
		}

		debug(2, 0, adjacentProjects)
		return adjacentProjects
	} catch (error) {
		handleError(error)
		return { prev: null, current: null, next: null }
	}
}

// Get image by id
export async function getImageById(
	id: string,
	slug: string
): Promise<Adjacent<IImage>> {
	try {
		await connectToDatabase()

		const currentProject = await ProjectModel.findOne({ slug }).populate(
			'images'
		)

		const sortedImages = currentProject.images.sort((a: IImage, b: IImage) =>
			a._id.toString().localeCompare(b._id.toString())
		)

		const currentImageIndex = sortedImages.findIndex(
			(image: IImage) => image._id.toString() === id
		)

		const currentImage = sortedImages[currentImageIndex]
		const prevImage = findPrev<IImage>(sortedImages, currentImageIndex)
		const nextImage = findNext<IImage>(sortedImages, currentImageIndex)

		const images = {
			prev: deepClone(prevImage),
			current: deepClone(currentImage),
			next: deepClone(nextImage),
		}

		debug(2, 9, images)
		return images
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

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ slug: updatedSlug, ...projectData },
			{ new: true }
		)

		debug(3, 0, updatedProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(updatedProject)
	} catch (error) {
		handleError(error)
	}
}

// Add image to project
export async function addImageToProject(
	slug: string,
	url?: string,
	caption?: string
) {
	try {
		await connectToDatabase()

		const image = await ImageModel.create({ url, caption })

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ $push: { images: image._id } }
		)

		debug(3, 1, updatedProject)
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

		debug(4, 1, updatedProject)
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

		const imagesIds = project.images.map((image: IImage) => image._id)
		await ImageModel.deleteMany({ _id: { $in: imagesIds } })

		const deletedProject = await ProjectModel.findByIdAndDelete(projectId)

		debug(4, 0, deletedProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(deletedProject)
	} catch (error) {
		handleError(error)
	}
}
