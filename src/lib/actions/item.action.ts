'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// lib
import { AdjacentImages, AdjacentItems, ItemFormData } from '@/lib/types'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { generateUniqueSlug, handleError } from '@/lib/utils'
import { getUser } from '@/lib/actions/user.action'
import { routes } from '@/navigation'
import ImageModel, { IImage } from '@/lib/models/image.model'
import ItemModel from '@/lib/models/item.model'

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

		const items = await ItemModel.find().populate('user', '_id username photo')

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

		const items = await ItemModel.find({ user: user._id }).populate(
			'user',
			'_id username photo'
		)

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

export async function getAdjacentItems(
	slug: string,
	userMode: boolean
): Promise<AdjacentItems> {
	try {
		await connectToDatabase()

		const userFilter: any = {}
		const itemQuery: any = { slug }

		if (userMode) {
			const { userId } = auth()
			const user = await getUser(userId)

			userFilter.user = user._id // { user: user._id}
			itemQuery.user = user._id // { slug, user: user._id}
		}
		const currentItem = await ItemModel.findOne(itemQuery).populate('images')

		const prevItem = await ItemModel.findOne({
			...userFilter,
			_id: { $lt: currentItem._id },
		}).sort({ _id: -1 })

		const nextItem = await ItemModel.findOne({
			...userFilter,
			_id: { $gt: currentItem._id },
		}).sort({ _id: 1 })

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

export async function getAdjacentImages(
	id: string,
	slug: string
): Promise<AdjacentImages> {
	try {
		await connectToDatabase()

		const currentItem = await ItemModel.findOne({ slug }).populate('images')

		const sortedImages = currentItem.images.sort((a: IImage, b: IImage) =>
			a._id.toString().localeCompare(b._id.toString())
		)

		const currentImageIndex = sortedImages.findIndex(
			(image: IImage) => image._id.toString() === id
		)

		const prevImage =
			currentImageIndex > 0 ? sortedImages[currentImageIndex - 1] : null

		const nextImage =
			currentImageIndex < sortedImages.length - 1
				? sortedImages[currentImageIndex + 1]
				: null

		const images = {
			prev: JSON.parse(JSON.stringify(prevImage)),
			next: JSON.parse(JSON.stringify(nextImage)),
		}

		console.log('*** getAdjacentImages:', images)
		return images
	} catch (error) {
		handleError(error)
		return { prev: null, next: null }
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

export async function addImageToItem(
	slug: string,
	url: string,
	caption: string
) {
	try {
		await connectToDatabase()

		const image = await ImageModel.create({ url, caption })

		const updatedItem = await ItemModel.findOneAndUpdate(
			{ slug },
			{ $push: { images: image._id } }
		)

		console.log('*** addImageToItem:', updatedItem)
		revalidatePath(routes.ITEMS)
		return JSON.parse(JSON.stringify(updatedItem))
	} catch (error) {
		handleError(error)
	}
}

export async function removeImageFromItem(slug: string, imageId: string) {
	try {
		await connectToDatabase()

		const updatedItem = await ItemModel.findOneAndUpdate(
			{ slug },
			{ $pull: { images: imageId } }
		)

		console.log('*** removeImageFromItem:', updatedItem)
		revalidatePath(routes.ITEMS)
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
