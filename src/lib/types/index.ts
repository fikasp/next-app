// modules
import { z } from 'zod'
import { itemSchema, searchSchema } from '@/lib/zod'
import { IItem } from '@/lib/models/item.model'
import { IImage } from '../models/image.model'

// FORMS
export type SearchFormData = z.infer<typeof searchSchema>
export type ItemFormData = z.infer<typeof itemSchema>

// ITEMS
export type AdjacentItems = {
	prev: IItem | null
	current: IItem | null
	next: IItem | null
}

// IMAGES
export type AdjacentImages = {
	prev: IImage | null
	next: IImage | null
}

// USER
export type CreateUserData = {
	clerkId: string
	email: string
	username: string
	firstName: string
	lastName: string
	photo: string
}

export type UpdateUserData = {
	username: string
	firstName: string
	lastName: string
	photo: string
}
