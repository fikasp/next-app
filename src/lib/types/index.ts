import { SortOptions } from '@/lib/types/enums'

// @class Adjacent
export type Adjacent<T> = {
	prev: T | null
	current: T | null
	next: T | null
}

// @class Option
export type Option = {
	value: string
	label: string
}

// @class UploadedImage
export type UploadedImage = {
	publicID: string
	name: string
	url: string
}

// @class ProjectSearchParams
export interface ProjectSearchParams extends SearchParams {
	sort?: SortOptions
	category?: string
	title?: string
	user?: string
}
