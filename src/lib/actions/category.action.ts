'use server'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { debug, handleError } from '@/lib/utils/dev'
import { CategoryModel } from '@/lib/models/category.model'
import { deepClone } from '@/lib/utils'

// CREATE
export async function createCategory(newLabel: string) {
	try {
		await connectToDatabase()
		const newCategory = await CategoryModel.create({ label: newLabel })

		debug(1, 9, newCategory)
		return deepClone(newCategory)
	} catch (error) {
		handleError(error)
	}
}

// READ
export async function getCategories() {
	try {
		await connectToDatabase()
		const categories = await CategoryModel.find()

		debug(2, 9, categories)
		return deepClone(categories)
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
export async function updateCategory(oldLabel: string, newLabel: string) {
	try {
		await connectToDatabase()

		const updatedCategory = await CategoryModel.findOneAndUpdate(
			{ label: oldLabel },
			{ label: newLabel },
			{ new: true }
		)
		if (!updatedCategory) {
			throw new Error('Category not found')
		}

		debug(3, 9, updatedCategory)
		return deepClone(updatedCategory)
	} catch (error) {
		handleError(error)
	}
}

// DELETE
export async function deleteCategory(label: string) {
	try {
		await connectToDatabase()
		const deletedCategory = await CategoryModel.findOneAndDelete({ label })

		if (!deletedCategory) {
			throw new Error('Category not found')
		}

		debug(4, 9, deletedCategory)
		return deepClone(deletedCategory)
	} catch (error) {
		handleError(error)
	}
}
