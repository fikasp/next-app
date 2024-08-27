// modules
import mongoose, { Mongoose } from 'mongoose'
// lib
import { UploadedImage } from '@/lib/types'

const MONGODB_URL = process.env.MONGODB_URL
const MONGODB_DB = process.env.MONGODB_DB

interface MongooseConnection {
	connection: Mongoose | null
	promise: Promise<Mongoose> | null
}

let cached: MongooseConnection = (global as any).mongoose || {
	connection: null,
	promise: null,
}

// Connect to MongoDB
export const connectToDatabase = async () => {
	if (cached.connection) return cached.connection

	if (!MONGODB_URL) throw new Error('Missing MONGODB_URL')

	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URL, {
			dbName: MONGODB_DB,
			bufferCommands: false,
		})

	cached.connection = await cached.promise

	return cached.connection
}

// Upload image to Cloudinary
export const uploadToCloudinary = async (
	file: any
): Promise<UploadedImage | undefined> => {
	const maxFileSize = 1024 * 1024 * 10 // 10MB
	if (file.size > maxFileSize) {
		throw new Error('File size too large. Max 10MB allowed.')
	}
	// Get Cloudinary credentials
	const { signature, timestamp, apiKey, cloudName, folder } = await fetch(
		'/api/cloudinary',
		{
			method: 'POST',
		}
	).then((res) => res.json())

	const formData = new FormData()
	formData.append('file', file)
	formData.append('api_key', apiKey)
	formData.append('timestamp', timestamp)
	formData.append('signature', signature)
	formData.append('folder', folder)

	// Upload image to Cloudinary
	const result = await fetch(
		`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
		{
			method: 'POST',
			body: formData,
		}
	).then((res) => res.json())

	// Return uploaded image
	const uploadedImage: UploadedImage = {
		name: result.original_filename,
		publicID: result.public_id,
		url: result.secure_url,
	}
	return uploadedImage
}
