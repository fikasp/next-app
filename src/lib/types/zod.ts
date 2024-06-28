// modules
import { z } from 'zod'
// lib
import { SortOptions } from '@/lib/types/enums'

export const projectSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must contain at least 3 characters' }),
	info: z
		.string()
		.min(3, { message: 'Information must contain at least 3 characters' }),
	category: z.string().min(1, { message: 'Category is required' }),
})

export const searchSchema = z.object({
	title: z.string(),
	category: z.string().optional(),
	sort: z.nativeEnum(SortOptions),
	profile: z.boolean(),
})

export type SearchFormData = z.infer<typeof searchSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
