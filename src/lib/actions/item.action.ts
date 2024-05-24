'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// lib
import ItemModel from '@/lib/models/item.model'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { generateUniqueSlug, handleError } from '@/lib/utils'
import { getUser } from '@/lib/actions/user.action'
import { AdjacentItems, ItemFormData } from '@/lib/types'
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
export async function getAllItems() {
	try {
		await connectToDatabase()

		const items = await ItemModel.find()

		console.log('*** getAllItems:', items)
		return JSON.parse(JSON.stringify(items))
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

// prettier-ignore
export async function getAdjacentItems(
	slug: string,
	home: boolean | undefined
): Promise<AdjacentItems> {
	try {
		await connectToDatabase()

		let currentItem
		let prevItem
		let nextItem

		if (home) {
			currentItem = await ItemModel
				.findOne({ slug })
			prevItem = await ItemModel
				.findOne({_id: { $lt: currentItem._id }})
				.sort({ _id: -1 })
			nextItem = await ItemModel
				.findOne({_id: { $gt: currentItem._id }})
				.sort({ _id: 1 })

		} else {
			const { userId } = auth()
			const user = await getUser(userId)

			currentItem = await ItemModel
				.findOne({ user: user._id, slug })
			prevItem = await ItemModel
				.findOne({ user: user._id, _id: { $lt: currentItem._id }})
				.sort({ _id: -1 })
			nextItem = await ItemModel
				.findOne({ user: user._id, _id: { $gt: currentItem._id }})
				.sort({ _id: 1 })
		}

		const items = {
			prev: JSON.parse(JSON.stringify(prevItem)),
			current: JSON.parse(JSON.stringify(currentItem)),
			next: JSON.parse(JSON.stringify(nextItem)),
		}

		console.log('*** getAdjacentItems:', items)
		return items
		
	} catch (error) {
		handleError(error)
		return { prev: null, current: null, next: null }
	}
}

// UPDATE
export async function updateItem(slug: string, itemData: ItemFormData) {
	try {
		await connectToDatabase()

		const updatedSlug = await generateUniqueSlug(
			ItemModel,
			itemData.title,
			slug
		)

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