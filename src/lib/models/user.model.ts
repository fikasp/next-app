import { Schema, model, models } from 'mongoose'

export interface IUser extends Document {
	_id: string
	clerkId: string
	email: string
	username: string
	firstName?: string
	lastName?: string
	photo?: string
}

const UserSchema = new Schema({
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
	username: {
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
	photo: {
		type: String,
	},
})

export const UserModel = models?.User || model('User', UserSchema)
