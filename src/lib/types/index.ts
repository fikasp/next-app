// Adjacent
export type Adjacent<T> = {
	prev: T | null
	current: T | null
	next: T | null
}

export type Result<T> = {
	success: boolean
	errors?: string[] | undefined
	data?: T | undefined
}

// Option
export type Option = {
	value: string
	label: string
}

// User
export type CreateUserData = {
	clerkId: string
	email: string
	username: string
	firstName: string
	lastName: string
	photo: string
}

export type UpdateUserData = {
	username: string
	firstName: string
	lastName: string
	photo: string
}
