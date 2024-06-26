'use server'
import { CategoryModel, ICategory } from '@/lib/models/category.model'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { debug, handleError } from '@/lib/utils/dev'
import { ProjectModel } from '@/lib/models/project.model'
import { deepClone } from '@/lib/utils'
import { Result } from '@/lib/types'

// CREATE
export async function createCategory(
	newLabel: string
): Promise<Result<ICategory>> {
	try {
		if (!newLabel) {
			return { success: false, errors: ['Label is required'] }
		}

		await connectToDatabase()
		const existingCategory = await CategoryModel.findOne({
			label: { $regex: new RegExp(`^${newLabel}$`, 'i') },
		})
		if (existingCategory) {
			return { success: false, errors: ['Category already exists'] }
		}

		const newCategory: ICategory = await CategoryModel.create({
			label: newLabel,
		})

		debug(2, 9, newCategory)
		return { success: true, data: deepClone(newCategory) }
	} catch (error) {
		handleError(error)
		return { success: false, errors: ['Error creating category'] }
	}
}

// READ
export async function getCategories(): Promise<Result<ICategory[]>> {
	try {
		await connectToDatabase()
		const categories: ICategory[] = await CategoryModel.find().sort({
			label: 1,
		})

		debug(3, 9, categories)
		return { success: true, data: deepClone(categories) }
	} catch (error) {
		handleError(error)
		return { success: false, errors: ['Error fetching categories'] }
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
			return { success: false, errors: ['Category already exists'] }
		}

		const updatedCategory: ICategory | null =
			await CategoryModel.findOneAndUpdate(
				{ label: oldLabel },
				{ label: newLabel },
				{ new: true }
			)
		if (!updatedCategory) {
			return { success: false, errors: ['Category not found'] }
		}

		debug(4, 9, updatedCategory)
		return { success: true, data: deepClone(updatedCategory) }
	} catch (error) {
		handleError(error)
		return { success: false, errors: ['Error updating category'] }
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
				errors: ['Category is used in projects, cannot delete'],
			}
		}

		const deletedCategory: ICategory | null =
			await CategoryModel.findOneAndDelete({ label })

		if (!deletedCategory) {
			return { success: false, errors: ['Category not found'] }
		}

		debug(5, 9, deletedCategory)
		return { success: true, data: deepClone(deletedCategory) }
	} catch (error) {
		handleError(error)
		return { success: false, errors: ['Error deleting category'] }
	}
}
