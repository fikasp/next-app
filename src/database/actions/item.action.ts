'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// database
import { connectToDatabase } from '@/database'
import { getUser } from '@/database/actions/user.action'
import Item from '@/database/models/item.model'
// lib
import { handleError } from '@/lib/utils'
import { ItemFormData } from '@/lib/zod'
import { routes } from '@/navigation'

// CREATE
export async function createItem(itemData: ItemFormData) {
	try {
		await connectToDatabase()

		const { userId } = auth()
		const user = await getUser(userId)

		const newItem = await Item.create({ user, ...itemData })
		console.log('Created Item:', newItem)
		revalidatePath(routes.ITEMS)

		return JSON.parse(JSON.stringify(newItem))
	} catch (error) {
		handleError(error)
	}
}

// READ
export async function getItemBySlug(slug: string) {
	try {
		await connectToDatabase()

		const item = await Item.findOne({ slug })

		if (!item) throw new Error('Item not found')
		console.log('Item:', item)

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

		const items = await Item.find({ user: user._id })
		// console.log('Items:', items)

		return JSON.parse(JSON.stringify(items))
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
// export async function updateItem(itemId: string, itemData: ItemFormData) {
// 	try {
// 		await connectToDatabase()

// 		const updatedItem = await Item.findOneAndUpdate({ _id: itemId }, itemData, {
// 			new: true,
// 		})

// 		if (!updatedItem) throw new Error('Item update failed')

// 		return JSON.parse(JSON.stringify(updatedItem))
// 	} catch (error) {
// 		handleError(error)
// 	}
// }

// DELETE
export async function deleteItem(itemId: string) {
	try {
		await connectToDatabase()

		const itemToDelete = await Item.findOne({ _id: itemId })

		if (!itemToDelete) throw new Error('Item not found')

		const deletedItem = await Item.findByIdAndDelete(itemToDelete._id)
		revalidatePath(routes.ITEMS)

		return deletedItem ? JSON.parse(JSON.stringify(deletedItem)) : null
	} catch (error) {
		handleError(error)
	}
}
