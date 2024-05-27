// modules
import { z } from 'zod'
import { itemSchema } from '@/lib/zod'
import { IItem } from '@/lib/models/item.model'
import { IImage } from '../models/image.model'

// ITEMS
export type ItemFormData = z.infer<typeof itemSchema>

export type AdjacentItems = {
	prev: IItem | null
	current: IItem | null
	next: IItem | null
}

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
