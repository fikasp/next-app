'use server'
// modules
import { revalidatePath } from 'next/cache'
// lib
import { CategoryModel, ICategory } from '@/lib/models/category.model'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { DataResult, Result } from '@/lib/types/results'
import { debug, handleError } from '@/lib/utils/dev'
import { deepClone } from '@/lib/utils'
import { ProjectModel } from '@/lib/models/project.model'
import { routes } from '@/lib/constants/paths'

// CREATE
export async function createCategory(
	newLabel: string
): Promise<Result<ICategory>> {
	try {
		if (!newLabel) {
			return { success: false, errors: { error: 'Category name is required.' } }
		}

		await connectToDatabase()
		const existingCategory = await CategoryModel.findOne({
			label: { $regex: new RegExp(`^${newLabel}$`, 'i') },
		})
		if (existingCategory) {
			return { success: false, errors: { error: 'Category already exists.' } }
		}

		const newCategory: ICategory = await CategoryModel.create({
			label: newLabel,
		})

		debug(2, 0, newCategory)
		revalidatePath(routes.ADD)
		return { success: true, data: deepClone(newCategory) }
	} catch (error) {
		handleError(error)
		return { success: false, errors: { error: 'Error creating category.' } }
	}
}

// READ
export async function getCategories(): Promise<DataResult<ICategory[]>> {
	try {
		await connectToDatabase()
		const categories: ICategory[] = await CategoryModel.find().sort({
			label: 1,
		})

		debug(3, 0, categories)
		return { success: true, data: deepClone(categories) }
	} catch (error) {
		handleError(error)
		return {
			success: false,
			errors: { error: 'Error fetching categories.' },
			data: [],
		}
	}
}

// UPDATE
export async function updateCategory(
	oldLabel: string,
	newLabel: string
): Promise<Result<ICategory>> {
	try {
		await connectToDatabase()

		const existingCategory = await CategoryModel.findOne({
			label: { $regex: new RegExp(`^${newLabel}$`, 'i') },
		})
		if (existingCategory) {
			return { success: false, errors: { error: 'Category already exists.' } }
		}

		const updatedCategory: ICategory | null =
			await CategoryModel.findOneAndUpdate(
				{ label: oldLabel },
				{ label: newLabel },
				{ new: true }
			)
		if (!updatedCategory) {
			return { success: false, errors: { error: 'Category not found.' } }
		}

		debug(4, 0, updatedCategory)
		revalidatePath(routes.ADD)
		return { success: true, data: deepClone(updatedCategory) }
	} catch (error) {
		handleError(error)
		return { success: false, errors: { error: 'Error updating category.' } }
	}
}

// DELETE
export async function deleteCategory(
	label: string
): Promise<Result<ICategory>> {
	try {
		await connectToDatabase()

		const existingCategory = await CategoryModel.findOne({ label })
		const projectsUsingCategory = await ProjectModel.findOne({
			category: existingCategory,
		})

		if (projectsUsingCategory) {
			return {
				success: false,
				errors: { error: 'Category is used in projects, cannot delete.' },
			}
		}

		const deletedCategory: ICategory | null =
			await CategoryModel.findOneAndDelete({ label })

		if (!deletedCategory) {
			return { success: false, errors: { error: 'Category not found.' } }
		}

		debug(5, 0, deletedCategory)
		revalidatePath(routes.ADD)
		return { success: true, data: deepClone(deletedCategory) }
	} catch (error) {
		handleError(error)
		return { success: false, errors: { error: 'Error deleting category.' } }
	}
}
