import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export async function POST() {
	const timestamp = Math.round(new Date().getTime() / 1000)

	const signature = cloudinary.utils.api_sign_request(
		{
			timestamp,
			folder: process.env.CLOUDINARY_FOLDER_NAME,
		},
		process.env.CLOUDINARY_API_SECRET as string
	)

	return NextResponse.json({
		signature,
		timestamp,
		apiKey: process.env.CLOUDINARY_API_KEY,
		cloudName: process.env.CLOUDINARY_CLOUD_NAME,
		folder: process.env.CLOUDINARY_FOLDER_NAME,
	})
}
