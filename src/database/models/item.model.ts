// modules
import { Schema, model, models } from 'mongoose'
// database
import { IUser } from '@/database/models/user.model'

export interface IItem extends Document {
	_id: string
	user: IUser
	title: string
	info: string
}

const ItemSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
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
