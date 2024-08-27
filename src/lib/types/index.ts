// @class Adjacent
export type Adjacent<T> = {
	prev: T | null
	current: T | null
	next: T | null
}

// @class CreateUserData
export type CreateUserData = {
	clerkId: string
	email: string
	username: string
	firstName: string
	lastName: string
	photo: string
}

// @class DataResult
export type DataResult<T> = {
	success: boolean
	error?: { [key: string]: string }
	data: T
}

// @class Option
export type Option = {
	value: string
	label: string
}

// @class Result
export type Result<T> = {
	success: boolean
	error?: { [key: string]: string }
	data?: T
}

// @class UpdateUserData
export type UpdateUserData = {
	username: string
	firstName: string
	lastName: string
	photo: string
}

// @class UploadedImage
export type UploadedImage = {
	publicID: string
	name: string
	url: string
}