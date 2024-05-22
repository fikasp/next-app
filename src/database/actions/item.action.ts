'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// database
import { connectToDatabase } from '@/database'
import { getUser } from '@/database/actions/user.action'
import ItemModel from '@/database/models/item.model'
// lib
import { generateUniqueSlug, handleError } from '@/lib/utils'
import { ItemFormData } from '@/lib/zod'
import { routes } from '@/navigation'


// CREATE
export async function createItem(itemData: ItemFormData) {
	try {
		await connectToDatabase()

		const { userId } = auth()
		const user = await getUser(userId)
		const slug = await generateUniqueSlug(ItemModel, itemData.title)

		const newItem = await ItemModel.create({ user, slug, ...itemData })
		revalidatePath(routes.ITEMS)

		console.log('*** createItem:', newItem)
		return JSON.parse(JSON.stringify(newItem))
	} catch (error) {
		handleError(error)
	}
}

// READ
export async function getItemBySlug(slug: string) {
	try {
		await connectToDatabase()

		const item = await ItemModel.findOne({ slug })

		console.log('*** getItemBySlug:', item)
		return JSON.parse(JSON.stringify(item))
	} catch (error) {
		handleError(error)
	}
}

export async function getItemsByUser() {
	try {
		await connectToDatabase()

		const { userId } = auth()
		const user = await getUser(userId)

		const items = await ItemModel.find({ user: user._id })

		console.log('*** getItemsByUser:', items)
		return JSON.parse(JSON.stringify(items))
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
export async function updateItem(slug: string, itemData: ItemFormData) {
	try {
		await connectToDatabase()

		const updatedSlug = await generateUniqueSlug(ItemModel, itemData.title, slug)

		const updatedItem = await ItemModel.findOneAndUpdate(
			{ slug },
			{ slug: updatedSlug, ...itemData },
			{ new: true }
		)

		revalidatePath(routes.ITEMS)

		console.log('*** updateItem:', updatedItem)
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

		const deletedItem = await ItemModel.findByIdAndDelete(itemToDelete._id)
		revalidatePath(routes.ITEMS)

		console.log('*** deleteItem:', deletedItem)
		return JSON.parse(JSON.stringify(deletedItem))
	} catch (error) {
		handleError(error)
	}
}
