// modules
import { revalidatePath } from 'next/cache'
// database
import { connectToDatabase } from '@/database'
import ItemModel from '@/database/models/item.model'
// lib
import { handleError } from '@/lib/utils'
import { ItemData } from '@/lib/types'

// CREATE
export async function createItem(itemData: ItemData) {
	try {
		await connectToDatabase()

		const newItem = await ItemModel.create(itemData)

		return JSON.parse(JSON.stringify(newItem))
	} catch (error) {
		handleError(error)
	}
}

// READ
export async function getItemById(itemId: string) {
	try {
		await connectToDatabase()

		const item = await ItemModel.findOne({ _id: itemId })

		if (!item) throw new Error('Item not found')

		return JSON.parse(JSON.stringify(item))
	} catch (error) {
		handleError(error)
	}
}

export async function getItemsByUser(userId: string) {
	try {
		await connectToDatabase()

		const events = ItemModel.find({ user: userId })

		return JSON.parse(JSON.stringify(events))
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
export async function updateItem(itemId: string, itemData: ItemData) {
	try {
		await connectToDatabase()

		const updatedItem = await ItemModel.findOneAndUpdate(
			{ _id: itemId },
			itemData,
			{
				new: true,
			}
		)

		if (!updatedItem) throw new Error('Item update failed')

		return JSON.parse(JSON.stringify(updatedItem))
	} catch (error) {
		handleError(error)
	}
}

// DELETE
export async function deleteItem(itemId: string) {
	try {
		await connectToDatabase()

		const itemToDelete = await ItemModel.findOne({ _id: itemId })

		if (!itemToDelete) throw new Error('Item not found')

		const deletedItem = await ItemModel.findByIdAndDelete(itemToDelete._id)
		revalidatePath('/')

		return deletedItem ? JSON.parse(JSON.stringify(deletedItem)) : null
	} catch (error) {
		handleError(error)
	}
}
