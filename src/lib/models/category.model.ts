// modules
import { Schema, model, models, Document } from 'mongoose'

export interface ICategory extends Document {
	_id: string
	label: string
}

const CategorySchema = new Schema({
	label: {
		type: String,
		required: true,
		unique: true,
	},
})

export const CategoryModel =
	models?.Category || model<ICategory>('Category', CategorySchema)
