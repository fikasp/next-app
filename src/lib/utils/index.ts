// modules
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import mongoose from 'mongoose'
import qs from 'query-string'
import slugify from 'slugify'
import { ZodSchema } from 'zod'
import { Option } from '../types'
import { ICategory } from '../models/category.model'
// components

// Capitalize first letter
export function capitalizeFirstLetter(str: string) {
	if (!str) {
		return str
	}
	return str.charAt(0).toUpperCase() + str.slice(1)
}

// Class names merge with tailwind
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Deep clone
export function deepClone(obj: any) {
	return JSON.parse(JSON.stringify(obj))
}

// Find prev element
export function findPrev<T>(array: T[], currentIndex: number) {
	return currentIndex > 0 ? array[currentIndex - 1] : null
}
// Find next element
export function findNext<T>(array: T[], currentIndex: number) {
	return currentIndex < array.length - 1 ? array[currentIndex + 1] : null
}

// Generate unique slug
export async function generateUniqueSlug(
	Model: mongoose.Model<any>,
	text: string,
	currentSlug?: string
): Promise<string> {
	const slugBase = slugify(text, { lower: true, strict: true })
	let newSlug = slugBase

	if (currentSlug !== newSlug) {
		let counter = 1
		while (await Model.findOne({ slug: newSlug })) {
			newSlug = `${slugBase}-${counter++}`
		}
	}
	return newSlug
}

// Generate URL
export function generateUrl(
	pathSegments: string[],
	queryParams: { [key: string]: string | undefined } = {}
): string {
	// Join the path segments into a single string
	const path = pathSegments.join('/')

	// Generate the full URL with query parameters
	return qs.stringifyUrl({
		url: path,
		query: queryParams,
	})
}

// Parse with zod schema
export function validateData(
	schema: ZodSchema,
	data: any
): Record<string, string> | null {
	const result = schema.safeParse(data)

	if (!result.success) {
		const errors = result.error.errors.reduce(
			(acc: Record<string, string>, error) => {
				const key = error.path.join('.')
				acc[key] = error.message
				return acc
			},
			{}
		)
		return errors
	}
	return null
}

// Prepare category options
export function prepareCategoryOptions(categories: ICategory[] | undefined) {
	const categoryOptions: Option[] = categories
		? categories.map((category: ICategory) => ({
				value: category.label,
				label: category.label,
		  }))
		: []

	return categoryOptions
}

// Update URL params
export function updateUrlParams(
	params: Record<string, string | undefined | null>
) {
	const url = new URL(window.location.toString())

	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null) {
			url.searchParams.delete(key)
		} else {
			url.searchParams.set(key, value)
		}
	})

	window.history.pushState({}, '', url.toString())
}
