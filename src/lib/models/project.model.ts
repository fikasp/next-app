// modules
import { Document } from 'mongoose'
import { Schema, model, models } from 'mongoose'
// lib
import { ICategory } from '@/lib/models/category.model'
import { IImage } from '@/lib/models/image.model'
import { IUser } from '@/lib/models/user.model'

export interface IProject extends Document {
	_id: string
	user: IUser
	slug: string
	title: string
	info: string
	category: ICategory
	images: IImage[]
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
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
	images: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Image',
			},
		],
		default: [],
	},
})

export const ProjectModel =
	models?.Project || model<IProject>('Project', ProjectSchema)
