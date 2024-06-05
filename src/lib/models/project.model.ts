// modules
import { Schema, model, models } from 'mongoose'
// lib
import { IUser } from '@/lib/models/user.model'
import { IItem } from '@/lib/models/item.model'
import { Document } from 'mongoose'

export interface IProject extends Document {
	_id: string
	user: IUser
	slug: string
	title: string
	info: string
	items: IItem[]
}

const ProjectSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	slug: {
		type: String,
		unique: true,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	info: {
		type: String,
		required: true,
	},
	items: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Item',
			},
		],
		default: [],
	},
})

export const ProjectModel =
	models?.Project || model<IProject>('Project', ProjectSchema)
