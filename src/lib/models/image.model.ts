// modules
import { Schema, model, models } from 'mongoose'

export interface IImage extends Document {
	_id: string
	url: string
	caption: string
}

const ImageSchema = new Schema({
	url: {
		type: String,
		required: true,
	},
	caption: {
		type: String,
		default: '',
	},
})

const ImageModel = models?.Image || model<IImage>('Image', ImageSchema)

export default ImageModel
