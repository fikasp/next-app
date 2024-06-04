'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// lib
import { AdjacentImages, AdjacentItems, ItemFormData } from '@/lib/types'
import { checkUserMode, generateUniqueSlug, handleError } from '@/lib/utils'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { getUser } from '@/lib/actions/user.action'
import { IUser } from '@/lib/models/user.model'
import { routes } from '@/navigation'
import { SortOptions } from '@/lib/types/enums'
import ImageModel, { IImage } from '@/lib/models/image.model'
import ItemModel from '@/lib/models/item.model'

// CREATE
export async function createItem(itemData: ItemFormData) {
	try {
		await connectToDatabase()

		const user: IUser = await getCurrentUser()
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
export async function getCurrentUser() {
	try {
		const { userId } = auth()
		const currentUser: IUser = await getUser(userId)
		return JSON.parse(JSON.stringify(currentUser))
	} catch (error) {
		handleError(error)
	}
}

export async function getItems(searchParams: any) {
	try {
		await connectToDatabase()

		const itemQuery: any = {}

		if (checkUserMode(searchParams)) {
			const currentUser: IUser = await getCurrentUser()
			itemQuery.user = currentUser._id
		} else if (searchParams.user) {
			itemQuery.user = searchParams.user
		}

		if (searchParams.title) {
			itemQuery.title = { $regex: searchParams.title, $options: 'i' }
		}

		const sortOptions: { [key: string]: any } = {
			[SortOptions.TITLE]: { title: 1 },
			[SortOptions.USER]: { 'user': 1, title: 1 },
			[SortOptions.DATE]: { _id: 1 },
		}

		const sort: any =
			sortOptions[searchParams.sort] || sortOptions[SortOptions.TITLE]

		const items = await ItemModel.find(itemQuery)
			.populate('user', '_id username photo')
			.sort(sort)

		// console.log('*** getItems:', items)
		return JSON.parse(JSON.stringify(items))
	} catch (error) {
		handleError(error)
	}
}

export async function getItemBySlug({
	slug,
	searchParams,
}: {
	slug: string
	searchParams: any
}): Promise<AdjacentItems> {
	try {
		const items = await getItems(searchParams)
		const currentIndex = items.findIndex((item: any) => item.slug === slug)

		const currentItem = await ItemModel.findOne({ slug }).populate('images')

		const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null
		const nextItem =
			currentIndex < items.length - 1 ? items[currentIndex + 1] : null

		const adjacentItems = {
			prev: JSON.parse(JSON.stringify(prevItem)),
			current: JSON.parse(JSON.stringify(currentItem)),
			next: JSON.parse(JSON.stringify(nextItem)),
		}

		console.log('*** getAdjacentItems:', adjacentItems)
		return adjacentItems
	} catch (error) {
		handleError(error)
		return { prev: null, current: null, next: null }
	}
}

export async function getImageById(
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
