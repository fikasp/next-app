// modules
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import mongoose from 'mongoose'
import qs from 'query-string'
import slugify from 'slugify'
import chalk, { ChalkInstance } from 'chalk'

// Tailwind classNames
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Debug log
export function debug(mode: number, data?: any) {
	const activeData = true
	const activeModes = [1, 2, 3]
	const modes: { [key: number]: ChalkInstance } = {
		0: chalk.gray,
		1: chalk.cyan,
		2: chalk.yellow,
		3: chalk.red,
	}
	if (!activeModes.includes(mode)) return

	const stack = new Error().stack
	const callerFunction = stack?.split('\n')[2].trim().split(' ')[1]
	const logFunction: ChalkInstance = modes[mode] || chalk.white
	console.log(logFunction(`<!-- ${callerFunction} -->`))

	if (data && activeData) {
		console.log(data)
	}
}

// Error handler
export const handleError = (error: unknown) => {
	if (error instanceof Error) {
		// This is a native JavaScript error
		console.error(error.message)
		throw new Error(`Error: ${error.message}`)
	} else if (typeof error === 'string') {
		// This is a string error message
		console.error(error)
		throw new Error(`Error: ${error}`)
	} else {
		// This is an unknown type of error
		console.error(error)
		throw new Error(`Unknown error: ${JSON.stringify(error)}`)
	}
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
