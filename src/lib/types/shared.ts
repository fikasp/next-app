// Option
export type Option = {
	value: string
	label: string
}

// Uploaded image
export type UploadedImage = {
	publicID: string
	name: string
	url: string
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
