// modules
import slugify from 'slugify'
import { Schema, model, models } from 'mongoose'
// database
import { IUser } from '@/database/models/user.model'

export interface IItem extends Document {
	_id: string
	user: IUser
	slug: string
	title: string
	info: string
}

const ItemSchema = new Schema({
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
})

const Item = models?.Item || model('Item', ItemSchema)

export default Item
