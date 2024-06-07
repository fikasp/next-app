'use client'
// modules
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import ArwForm from '@/components/arw/ArwForm'
import Uploader from '@/components/shared/Uploader'
// lib
import { useUploadThing } from '@/lib/utils/uploadthing'
import { imageSchema, ImageFormData } from '@/lib/utils/zod'
import { debug } from '@/lib/utils/dev'
import { images } from '@/navigation'

export default function ImageForm({ handleAddImage }: { handleAddImage: any }) {
	const [files, setFiles] = useState<File[]>([])
	const [isUploading, setIsUploading] = useState(false)
	const { startUpload } = useUploadThing('imageUploader')

	const form = useForm<ImageFormData>({
		resolver: zodResolver(imageSchema),
		defaultValues: {
			url: '',
		},
	})

	const onSubmit = async (imageFormData: ImageFormData) => {
		setIsUploading(true)
		let uploadedImageUrl = imageFormData.url

		if (files.length > 0) {
			const uploadedImages = await startUpload(files)
			if (!uploadedImages) {
				return
			}
			uploadedImageUrl = uploadedImages[0].url
		} else {
			uploadedImageUrl = images.IMAGE
		}

		form.reset()
		setFiles([])
		setIsUploading(false)
		handleAddImage(uploadedImageUrl)
		debug(2, 2, uploadedImageUrl)
	}

	return (
		<ArwForm
			form={form}
			onSubmit={onSubmit}
			className="h-[150px] w-full relative"
		>
			<FormField
				name="url"
				control={form.control}
				render={({ field }) => (
					<Uploader
						onFieldChange={field.onChange}
						imageUrl={field.value}
						setFiles={setFiles}
					/>
				)}
			/>
			<Button className="absolute w-full-2 left-2 top-2 bg-black/50 dark:bg-white/50">
				{isUploading ? 'Uploading...' : 'Upload image'}
			</Button>
		</ArwForm>
	)
}
