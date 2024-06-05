'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// lib
import {
	checkUserMode,
	debug,
	deepClone,
	generateUniqueSlug,
	handleError,
} from '@/lib/utils'
import { Adjacent } from '@/lib/types'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { findPrev, findNext } from '@/lib/utils'
import { getUser } from '@/lib/actions/user.action'
import { IItem, ItemModel } from '@/lib/models/item.model'
import { IProject, ProjectModel } from '@/lib/models/project.model'
import { IUser } from '@/lib/models/user.model'
import { ProjectFormData } from '@/lib/zod'
import { SortOptions } from '@/lib/types/enums'
import { routes } from '@/navigation'

// CREATE
// Create project
export async function createProject(projectData: ProjectFormData) {
	try {
		await connectToDatabase()

		const user: IUser = await getCurrentUser()
		const slug = await generateUniqueSlug(ProjectModel, projectData.title)

		const newProject = await ProjectModel.create({ user, slug, ...projectData })
		revalidatePath(routes.PROJECTS)

		debug(2, newProject)
		// console.log('*** createProject:', newProject)
		return JSON.parse(JSON.stringify(newProject))
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
		return JSON.parse(JSON.stringify(currentUser))
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

		debug(0, projects)
		return JSON.parse(JSON.stringify(projects))
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
			'items'
		)
		const prevProject = findPrev<IProject>(projects, currentIndex)
		const nextProject = findNext<IProject>(projects, currentIndex)

		const adjacentProjects = {
			prev: JSON.parse(JSON.stringify(prevProject)),
			current: JSON.parse(JSON.stringify(currentProject)),
			next: JSON.parse(JSON.stringify(nextProject)),
		}

		debug(1, adjacentProjects)
		return adjacentProjects
	} catch (error) {
		handleError(error)
		return { prev: null, current: null, next: null }
	}
}

// Get item by id
export async function getItemById(
	id: string,
	slug: string
): Promise<Adjacent<IItem>> {
	try {
		await connectToDatabase()

		const currentProject = await ProjectModel.findOne({ slug }).populate(
			'items'
		)

		const sortedItems = currentProject.items.sort((a: IItem, b: IItem) =>
			a._id.toString().localeCompare(b._id.toString())
		)

		const currentItemIndex = sortedItems.findIndex(
			(item: IItem) => item._id.toString() === id
		)

		const currentItem = sortedItems[currentItemIndex]
		const prevItem = findPrev<IItem>(sortedItems, currentItemIndex)
		const nextItem = findNext<IItem>(sortedItems, currentItemIndex)

		const items = {
			prev: deepClone(prevItem),
			current: deepClone(currentItem),
			next: deepClone(nextItem),
		}

		debug(1, items)
		return items
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

		revalidatePath(routes.PROJECTS)

		debug(2, updatedProject)
		return JSON.parse(JSON.stringify(updatedProject))
	} catch (error) {
		handleError(error)
	}
}

// Add item to project
export async function addItemToProject(
	slug: string,
	url?: string,
	caption?: string
) {
	try {
		await connectToDatabase()

		const item = await ItemModel.create({ url, caption })

		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ $push: { items: item._id } }
		)

		debug(2, updatedProject)
		revalidatePath(routes.PROJECTS)
		return JSON.parse(JSON.stringify(updatedProject))
	} catch (error) {
		handleError(error)
	}
}

// Remove item from project
export async function removeItemFromProject(slug: string, itemId: string) {
	try {
		await connectToDatabase()

		const deletedItem = await ItemModel.findByIdAndDelete(itemId)
		if (!deletedItem) {
			throw new Error('Item not found')
		}
		const updatedProject = await ProjectModel.findOneAndUpdate(
			{ slug },
			{ $pull: { items: itemId } }
		)

		debug(3, updatedProject)
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

		const project = await ProjectModel.findById(projectId).populate('items')

		const itemIds = project.items.map((item: IItem) => item._id)
		await ItemModel.deleteMany({ _id: { $in: itemIds } })

		const deletedProject = await ProjectModel.findByIdAndDelete(projectId)
		revalidatePath(routes.PROJECTS)

		debug(3, deletedProject)
		return JSON.parse(JSON.stringify(deletedProject))
	} catch (error) {
		handleError(error)
	}
}
