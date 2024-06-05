// modules
import { Schema, model, models } from 'mongoose'

export interface IItem extends Document {
	_id: string
	url: string
}

const ItemSchema = new Schema({
	url: {
		type: String,
		default: '',
	},
})

export const ItemModel = models?.Item || model<IItem>('Item', ItemSchema)
