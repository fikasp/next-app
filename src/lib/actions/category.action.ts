'use server'
import { CategoryModel } from '@/lib/models/category.model'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { debug, handleError } from '@/lib/utils/dev'
import { ProjectModel } from '@/lib/models/project.model'
import { deepClone } from '@/lib/utils'

// CREATE
export async function createCategory(newLabel: string) {
	try {
		await connectToDatabase()
		const existingCategory = await CategoryModel.findOne({
			label: { $regex: new RegExp(`^${newLabel}$`, 'i') },
		})
		if (existingCategory) {
			return { error: 'Category already exists' }
		}

		const newCategory = await CategoryModel.create({ label: newLabel })

		debug(2, 9, newCategory)
		return deepClone(newCategory)
	} catch (error) {
		handleError(error)
	}
}

// READ
export async function getCategories() {
	try {
		await connectToDatabase()
		const categories = await CategoryModel.find().sort({ label: 1 })

		debug(3, 9, categories)
		return deepClone(categories)
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
export async function updateCategory(oldLabel: string, newLabel: string) {
	try {
		await connectToDatabase()

		const existingCategory = await CategoryModel.findOne({
			label: { $regex: new RegExp(`^${newLabel}$`, 'i') },
		})
		if (existingCategory) {
			return { error: 'Category already exists' }
		}

		const updatedCategory = await CategoryModel.findOneAndUpdate(
			{ label: oldLabel },
			{ label: newLabel },
			{ new: true }
		)
		if (!updatedCategory) {
			return { error: 'Category not found' }
		}

		debug(4, 9, updatedCategory)
		return deepClone(updatedCategory)
	} catch (error) {
		handleError(error)
	}
}

// DELETE
export async function deleteCategory(label: string) {
	try {
		await connectToDatabase()

		const existingCategory = await CategoryModel.findOne({ label })
		const projectsUsingCategory = await ProjectModel.findOne({
			category: existingCategory,
		})

		if (projectsUsingCategory) {
			return { error: 'Category is used in projects, cannot delete' }
		}

		const deletedCategory = await CategoryModel.findOneAndDelete({ label })

		if (!deletedCategory) {
			return { error: 'Category not found' }
		}

		debug(5, 9, deletedCategory)
		return deepClone(deletedCategory)
	} catch (error) {
		handleError(error)
	}
}
