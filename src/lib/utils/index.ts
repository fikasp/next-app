// modules
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { ZodSchema } from 'zod'
import mongoose from 'mongoose'
import qs from 'query-string'
import slugify from 'slugify'


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

// Load image
export function loadImage(transformations: string) {
	return function (config: any) {
		const [urlStart, urlEnd] = config.src.split('upload')
		return `${urlStart}upload/${transformations}/${urlEnd}`
	}
}

// Parse with zod schema
export function validateData(
	schema: ZodSchema,
	data: any
): Record<string, string> | null {
	const result = schema.safeParse(data)

	if (!result.success) {
		const errors = Object.fromEntries(
			result.error.errors.map((error) => [error.path, error.message])
		)
		return errors
	}
	return null
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
