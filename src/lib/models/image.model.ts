// modules
import { Schema, model, models } from 'mongoose'

export interface IImage extends Document {
	_id: string
	url: string
	key: string
	name: string
}

const ImageSchema = new Schema({
	url: {
		type: String,
		default: '',
	},
	key: {
		type: String,
		default: '',
	},
	name: {
		type: String,
		default: '',
	},
})

export const ImageModel = models?.Image || model<IImage>('Image', ImageSchema)
