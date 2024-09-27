// modules
import { auth } from '@clerk/nextjs/server'
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { ZodSchema } from 'zod'
import mongoose from 'mongoose'
import qs from 'query-string'
import slugify from 'slugify'
// lib
import { getCurrentUser } from '@/lib/actions/user.actions'
import { IUser } from '@/lib/models/user.model'
import { routes } from '@/lib/constants/paths'
import { txt } from '@/lib/constants'

// @func capitalizeFirstLetter
export function capitalizeFirstLetter(str: string) {
	if (!str) {
		return str
	}
	return str.charAt(0).toUpperCase() + str.slice(1)
}

// @func checkIsAdmin
export function checkIsAdmin(): boolean {
	const { sessionClaims } = auth()
	return sessionClaims?.metadata.role === 'admin'
}

// @func checkIsOwner
export async function checkIsOwner(user: undefined | IUser): Promise<boolean> {
	const currentUser = await getCurrentUser()
	return user?._id === currentUser?._id
}

// @func cn
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// @func createFormDataFromFile
export function createFormDataFromFile(file: File): FormData {
	const formData = new FormData()
	formData.append('file', file)
	return formData
}

// @func deepClone
export function deepClone(obj: any) {
	return JSON.parse(JSON.stringify(obj))
}

// @func extractBaseRoute
export function extractBaseRoute(pathname: string): string {
	const parts = pathname.split('/')
	return parts.length > 2 ? `/${parts[1]}` : pathname
}

// @func findNext
export function findNext<T>(array: T[], currentIndex: number) {
	return currentIndex < array.length - 1 ? array[currentIndex + 1] : null
}

// @func findPrev
export function findPrev<T>(array: T[], currentIndex: number) {
	return currentIndex > 0 ? array[currentIndex - 1] : null
}

// @func generateUniqueSlug
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
export function generateUrl(
	pathSegments: string[],
	searchParams: SearchParams = {}
): string {
	// Join the path segments into a single string
	const path = pathSegments.join('/')

	// Generate the full URL with query parameters
	return qs.stringifyUrl({
		url: path,
		query: searchParams,
	})
}

// @func getBaseRoute
export const getBaseRoute = (
	profile: boolean | undefined,
	admin?: boolean | undefined
) => {
	return profile ? routes.PROFILE : admin ? routes.ADMIN : routes.PROJECTS
}

// @func getEntityText
export const getEntityText = (
	entity: any,
	entityName: string = '',
	isSubmitting?: boolean
) => {
	if (isSubmitting) {
		return entity ? txt.common.UPDATING : txt.common.ADDING
	} else {
		return entity
			? `${txt.common.UPDATE} ${entityName}`
			: `${txt.common.ADD} ${entityName}`
	}
}

// @func loadImage
export function loadImage(transformations: string) {
	return function (config: any) {
		return transformImageUrl(config.src, transformations)
	}
}

// @func toStringArray
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

// @func transformImageUrl
export function transformImageUrl(url: string, transformations: string) {
	const [urlStart, urlEnd] = url.split('upload')
	return `${urlStart}upload/${transformations}/${urlEnd}`
}

// @func updateUrlParams
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
export function updateUrlPath(newPath: string) {
	const url = new URL(window.location.toString())
	url.pathname = newPath
	window.history.pushState({}, '', url.toString())
}

// @func validateData
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
