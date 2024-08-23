// modules
import { Document, Schema, model, models } from 'mongoose'
// lib
import { ICategory } from '@/lib/models/category.model'
import { IImage } from '@/lib/models/image.model'
import { IUser } from '@/lib/models/user.model'

export interface IProject extends Document {
	_id: string
	category: ICategory
	cover: IImage | null
	images: IImage[]
	info: string
	order: number
	slug: string
	title: string
	user: IUser
}

const ProjectSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
	cover: {
		type: Schema.Types.ObjectId,
		ref: 'Image',
		default: null,
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
	info: {
		type: String,
		required: true,
	},
	order: {
		type: Number,
		required: true,
		default: 0,
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
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
})

export const ProjectModel =
	models?.Project || model<IProject>('Project', ProjectSchema)
