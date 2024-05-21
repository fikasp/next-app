'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import slugify from 'slugify'
// database
import { connectToDatabase } from '@/database'
import { getUser } from '@/database/actions/user.action'
import Item from '@/database/models/item.model'
// lib
import { handleError } from '@/lib/utils'
import { ItemFormData } from '@/lib/zod'
import { routes } from '@/navigation'

async function generateUniqueSlug(
	text: string,
	currentSlug?: string
): Promise<string> {
	const slugBase = slugify(text, { lower: true, strict: true })
	let newSlug = slugBase

	if (currentSlug !== newSlug) {
		let slugCounter = 1
		let slugExists = await Item.findOne({ slug: newSlug })

		while (slugExists) {
			newSlug = `${slugBase}-${slugCounter}`
			slugExists = await Item.findOne({ slug: newSlug })
			slugCounter++
		}
	}
	return newSlug
}

// CREATE
export async function createItem(itemData: ItemFormData) {
	try {
		await connectToDatabase()

		const { userId } = auth()
		const user = await getUser(userId)
		const slug = await generateUniqueSlug(itemData.title)

		const newItem = await Item.create({ user, slug, ...itemData })
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

		const item = await Item.findOne({ slug })

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

		const items = await Item.find({ user: user._id })

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

		const updatedSlug = await generateUniqueSlug(itemData.title, slug)

		const updatedItem = await Item.findOneAndUpdate(
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

		const itemToDelete = await Item.findOne({ _id: itemId })

		const deletedItem = await Item.findByIdAndDelete(itemToDelete._id)
		revalidatePath(routes.ITEMS)

		console.log('*** deleteItem:', deletedItem)
		return JSON.parse(JSON.stringify(deletedItem))
	} catch (error) {
		handleError(error)
	}
}
