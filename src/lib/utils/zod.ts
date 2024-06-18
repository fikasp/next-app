// modules
import { z } from 'zod'
// lib
import { SortOptions } from '@/lib/types/enums'
import { categories, msg } from '@/lib/constants'

export const projectSchema = z.object({
	title: z.string().min(3, { message: msg.MIN_LENGTH(3) }),
	info: z.string().min(3, { message: msg.MIN_LENGTH(3) }),
	category: z.string().min(1, { message: 'Category is required' }),
})

export const searchSchema = z.object({
	title: z.string(),
	category: z.string().optional(),
	sort: z.nativeEnum(SortOptions),
	profile: z.boolean(),
})

export const imageSchema = z.object({
	url: z.string(),
})

export type SearchFormData = z.infer<typeof searchSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
export type ImageFormData = z.infer<typeof imageSchema>
