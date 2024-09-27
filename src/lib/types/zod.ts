// modules
import { z } from 'zod'
import { txt } from '@/lib/constants'

export const projectFormSchema = z.object({
	title: z.string().min(3, { message: txt.zod.TITLE }),
	info: z.string().min(3, { message: txt.zod.INFO }),
	category: z.string().min(1, { message: txt.zod.CATEGORY }),
})

export const searchFormSchema = z.object({
	title: z.string(),
	category: z.string().optional(),
	profile: z.boolean(),
})

export type SearchFormValues = z.infer<typeof searchFormSchema>
export type ProjectFormValues = z.infer<typeof projectFormSchema>
