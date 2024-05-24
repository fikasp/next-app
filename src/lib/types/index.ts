// modules
import { z } from 'zod'
import { itemSchema } from '@/lib/zod'

export type ItemFormData = z.infer<typeof itemSchema>

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
