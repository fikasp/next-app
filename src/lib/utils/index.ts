// modules
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import mongoose from 'mongoose'
import qs from 'query-string'
import slugify from 'slugify'

// Tailwind classNames
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}



// Check user mode
export function checkUserMode(searchParams: any) {
	return searchParams?.user == 'current'
}

// Slug generator
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

// URL generator
export function generateUrl(
	pathSegments: string[],
	queryParams: { [key: string]: string } = {}
): string {
	// Join the path segments into a single string
	const path = pathSegments.join('/')

	// Generate the full URL with query parameters
	return qs.stringifyUrl({
		url: path,
		query: queryParams,
	})
}

// Find prev
export function findPrev<T>(array: T[], currentIndex: number) {
	return currentIndex > 0 ? array[currentIndex - 1] : null
}
// Find next
export function findNext<T>(array: T[], currentIndex: number) {
	return currentIndex < array.length - 1 ? array[currentIndex + 1] : null
}

// Deep clone
export function deepClone(obj: any) {
	return JSON.parse(JSON.stringify(obj))
}
