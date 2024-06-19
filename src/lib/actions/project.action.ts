'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// lib
import profilel, { IUser } from '@/lib/models/user.model'
import { deepClone, generateUniqueSlug } from '@/lib/utils'
import { Adjacent } from '@/lib/types'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { debug, handleError } from '@/lib/utils/dev'
import { deleteFiles } from '@/lib/actions/image.action'
import { findPrev, findNext } from '@/lib/utils'
import { getUser } from '@/lib/actions/user.action'
import { IImage, ImageModel } from '@/lib/models/image.model'
import { IProject, ProjectModel } from '@/lib/models/project.model'
import { ProjectFormData } from '@/lib/utils/zod'
import { SortOptions } from '@/lib/types/enums'
import { routes } from '@/navigation'

import { CategoryModel, ICategory } from '../models/category.model'

// CREATE
// Create project
export async function createProject(projectData: ProjectFormData) {
	try {
		await connectToDatabase()

		const user: IUser = await getCurrentUser()
		const category: ICategory | null = await CategoryModel.findById(
			projectData.category
		)
		const slug = await generateUniqueSlug(ProjectModel, projectData.title)

		const newProject = await ProjectModel.create({
			user,
			slug,
			title: projectData.title,
			info: projectData.info,
			category,
		})

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
export async function getProjects(searchParams: any, profile: boolean) {
	try {
		await connectToDatabase()

		const projectQuery: any = {}

		if (profile) {
			const user: IUser = await getCurrentUser()
			projectQuery.user = user._id
		} else if (searchParams.user) {
			const user = await profilel.findOne({ username: searchParams.user })
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

		debug(9, 9, projects)
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

		debug(2, 1, adjacentProjects)
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
	url: string,
	key?: string,
	name?: string
) {
	try {
		await connectToDatabase()

		const image = await ImageModel.create({ url, key, name })

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ $push: { images: image._id } }
		)

		debug(3, 9, updatedProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(updatedProject)
	} catch (error) {
		handleError(error)
	}
}

// Remove image from project
export async function removeImageFromProject(
	slug: string,
	imageId: string,
	imageKey: string
) {
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
		if (imageKey) {
			const deletedFile = await deleteFiles([imageKey])
			debug(0, 0, deletedFile)
		}

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

		if (!project) {
			throw new Error('Project not found')
		}

		// Extract image IDs and keys
		const imagesIds = project.images.map((image: IImage) => image._id)
		const imagesKeys = project.images.map((image: IImage) => image.key)

		// Delete images from the database
		await ImageModel.deleteMany({ _id: { $in: imagesIds } })

		// Delete image files from storage if they exist
		if (imagesKeys.length > 0) {
			const deletedFiles = await deleteFiles(imagesKeys)
			debug(0, 0, deletedFiles)
		}

		// Delete the project
		const deletedProject = await ProjectModel.findByIdAndDelete(projectId)

		debug(4, 0, deletedProject)
		revalidatePath(routes.PROJECTS)
		return deepClone(deletedProject)
	} catch (error) {
		handleError(error)
	}
}
