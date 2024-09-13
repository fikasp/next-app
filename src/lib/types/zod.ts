// modules
import { z } from 'zod'

export const projectFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must contain at least 3 characters' }),
	info: z
		.string()
		.min(3, { message: 'Information must contain at least 3 characters' }),
	category: z.string().min(1, { message: 'Category is required' }),
})

export const searchFormSchema = z.object({
	title: z.string(),
	category: z.string().optional(),
	profile: z.boolean(),
})

export type SearchFormValues = z.infer<typeof searchFormSchema>
export type ProjectFormValues = z.infer<typeof projectFormSchema>
