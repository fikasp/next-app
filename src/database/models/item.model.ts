import { Schema, model, models } from 'mongoose'

const ItemSchema = new Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
})

const ItemModel = models?.Item || model('Item', ItemSchema)

export default ItemModel
