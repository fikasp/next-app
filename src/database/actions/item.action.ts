'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// database
import { connectToDatabase } from '@/database'
import { getUserById } from '@/database/actions/user.action'
import Item from '@/database/models/item.model'
// lib
import { handleError } from '@/lib/utils'
import { ItemFormData } from '@/lib/zod'

// CREATE
export async function createItem(itemData: ItemFormData) {
	try {
		await connectToDatabase()

		const { userId } = auth()
		const user = await getUserById(userId)

		const newItem = await Item.create({ user, ...itemData })
		console.log('Created Item:', newItem)

		return JSON.parse(JSON.stringify(newItem))
	} catch (error) {
		handleError(error)
	}
}

// READ
export async function getItemById(itemId: string) {
	try {
		await connectToDatabase()

		const item = await Item.findOne({ _id: itemId })

		if (!item) throw new Error('Item not found')

		return JSON.parse(JSON.stringify(item))
	} catch (error) {
		handleError(error)
	}
}

export async function getItemsByUser(userId: string) {
	try {
		await connectToDatabase()

		const events = Item.find({ user: userId })

		return JSON.parse(JSON.stringify(events))
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
export async function updateItem(itemId: string, itemData: ItemFormData) {
	try {
		await connectToDatabase()

		const updatedItem = await Item.findOneAndUpdate({ _id: itemId }, itemData, {
			new: true,
		})

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

		const itemToDelete = await Item.findOne({ _id: itemId })

		if (!itemToDelete) throw new Error('Item not found')

		const deletedItem = await Item.findByIdAndDelete(itemToDelete._id)
		revalidatePath('/')

		return deletedItem ? JSON.parse(JSON.stringify(deletedItem)) : null
	} catch (error) {
		handleError(error)
	}
}
