// modules
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { ZodSchema } from 'zod'
import mongoose from 'mongoose'
import qs from 'query-string'
import slugify from 'slugify'
// lib
import { getCurrentUser } from '@/lib/actions/user.actions'
import { IUser } from '@/lib/models/user.model'

// @func capitalizeFirstLetter
// Capitalize first letter
export function capitalizeFirstLetter(str: string) {
	if (!str) {
		return str
	}
	return str.charAt(0).toUpperCase() + str.slice(1)
}

// @func cn
// Class names merge with tailwind
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// @func deepClone
// Deep clone
export function deepClone(obj: any) {
	return JSON.parse(JSON.stringify(obj))
}

// @func findPrev
// Find prev element
export function findPrev<T>(array: T[], currentIndex: number) {
	return currentIndex > 0 ? array[currentIndex - 1] : null
}

// @func findNext
// Find next element
export function findNext<T>(array: T[], currentIndex: number) {
	return currentIndex < array.length - 1 ? array[currentIndex + 1] : null
}

// @func checkIfCurrentUserIsOwner
// Check if the current user is the owner
export async function checkIfCurrentUserIsOwner(
	user: undefined | IUser
): Promise<boolean> {
	const currentUser = await getCurrentUser()
	return user?._id === currentUser?._id
}

// @func generateUniqueSlug
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

// @func generateUrl
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

// @func loadImage
// Load image
export function loadImage(transformations: string) {
	return function (config: any) {
		return transformImageUrl(config.src, transformations)
	}
}

// @func toStringArray
// To string array
export function toStringArray(
	data: string | string[] | { [key: string]: string }
) {
	if (typeof data === 'string') {
		return [data]
	} else if (Array.isArray(data)) {
		return data
	} else if (
		typeof data === 'object' &&
		data !== null &&
		Object.keys(data).length > 0
	) {
		return Object.values(data).map((value) => value.toString())
	} else {
		return []
	}
}

// @func validateData
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

// @func transformImageUrl
// Transform image URL
export function transformImageUrl(url: string, transformations: string) {
	const [urlStart, urlEnd] = url.split('upload')
	return `${urlStart}upload/${transformations}/${urlEnd}`
}

// @func updateUrlParams
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

// @func updateUrlPath
// Update URL path
export function updateUrlPath(newPath: string) {
	const url = new URL(window.location.toString())
	url.pathname = newPath
	window.history.pushState({}, '', url.toString())
}
