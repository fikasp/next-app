// Adjacent
export type Adjacent<T> = {
	prev: T | null
	current: T | null
	next: T | null
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
