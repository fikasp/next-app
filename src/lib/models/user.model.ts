import { Schema, model, models } from 'mongoose'

export interface IUser extends Document {
	_id: string
	admin: boolean
	clerkId: string
	email: string
	firstName?: string
	lastName?: string
	username: string
	photo?: string
}

const UserSchema = new Schema({
	admin: {
		type: Boolean,
		required: true,
		default: false,
	},
	clerkId: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	photo: {
		type: String,
	},
})

export const UserModel = models?.User || model('User', UserSchema)
