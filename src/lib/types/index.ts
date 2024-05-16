// Commmon
export enum Operation {
	CREATE = 'CREATE',
	UPDATE = 'UPDATE',
}

// Items
export type ItemData = {
	userId: string
	title: string
	description: string
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
	firstName: string
	lastName: string
	username: string
	photo: string
}
