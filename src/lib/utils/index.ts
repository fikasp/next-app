import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
