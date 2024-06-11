// modules
import { z } from 'zod'
// lib
import { SortOptions } from '@/lib/types/enums'
import { msg } from '@/lib/constants'

export const projectSchema = z.object({
	title: z.string().min(3, { message: msg.MIN_LENGTH(3) }),
	info: z.string().min(3, { message: msg.MIN_LENGTH(3) }),
})

export const searchSchema = z.object({
	title: z.string(),
	sort: z.nativeEnum(SortOptions),
	userMode: z.boolean(),
})

export const imageSchema = z.object({
	url: z.string(),
})

export type SearchFormData = z.infer<typeof searchSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
export type ImageFormData = z.infer<typeof imageSchema>