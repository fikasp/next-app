'use server'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { debug, handleError } from '@/lib/utils/dev'
import { CategoryModel } from '@/lib/models/category.model'
import { deepClone } from '@/lib/utils'

// CREATE
export async function createCategory(categoryData: { label: string }) {
	try {
		await connectToDatabase()
		debug(9, 9, categoryData)

		const newCategory = await CategoryModel.create(categoryData)

		debug(9, 9, newCategory)
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

		debug(0, 0, categories)
		return deepClone(categories)
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
export async function updateCategory(
	id: string,
	categoryData: { label: string }
) {
	try {
		await connectToDatabase()

		const updatedCategory = await CategoryModel.findByIdAndUpdate(
			id,
			categoryData,
			{ new: true }
		)
		if (!updatedCategory) {
			throw new Error('Category not found')
		}

		debug(2, 0, updatedCategory)
		return deepClone(updatedCategory)
	} catch (error) {
		handleError(error)
	}
}

// DELETE
export async function deleteCategory(id: string) {
	try {
		await connectToDatabase()

		const deletedCategory = await CategoryModel.findByIdAndDelete(id)

		if (!deletedCategory) {
			throw new Error('Category not found')
		}

		debug(4, 0, deletedCategory)
		return deepClone(deletedCategory)
	} catch (error) {
		handleError(error)
	}
}
