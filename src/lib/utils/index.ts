// modules
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import mongoose from 'mongoose'
import slugify from 'slugify'

// Tailwind classNames
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
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

// Slug generator
export async function generateUniqueSlug(
	Model: mongoose.Model<any>,
	text: string,
	currentSlug?: string
): Promise<string> {
	const slugBase = slugify(text, { lower: true, strict: true })
	let uniqueSlug = slugBase

	if (currentSlug !== uniqueSlug) {
		let slugCounter = 1
		let slugExists

		do {
			slugExists = await Model.findOne({ slug: uniqueSlug })
			if (slugExists) {
				uniqueSlug = `${slugBase}-${slugCounter}`
				slugCounter++
			}
		} while (slugExists)
	}
	return uniqueSlug
}
