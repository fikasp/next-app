'use server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	api_key: process.env.CLOUDINARY_API_KEY,
})

export async function uploadImage(formData: FormData) {
	const image = formData.get('file') as File
	const imageData = await image.arrayBuffer()
	const mime = image.type
	const encoding = 'base64'
	const base64Data = Buffer.from(imageData).toString(encoding)
	const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data
	const result = await cloudinary.uploader.upload(fileUri, {
		folder: 'next-app',
	})
	return result.secure_url
}
