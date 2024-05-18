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

ItemSchema.pre('validate', async function (next) {
	if (this.isModified('title')) {
		let slug = slugify(this.title, { lower: true, strict: true })
		const Item = model('Item')

		let slugExists = await Item.findOne({ slug })
		let counter = 1
		while (slugExists) {
			slug = `${slugify(this.title, { lower: true, strict: true })}-${counter}`
			slugExists = await Item.findOne({ slug })
			counter++
		}
		this.slug = slug
	}
	next()
})

const Item = models?.Item || model('Item', ItemSchema)

export default Item
