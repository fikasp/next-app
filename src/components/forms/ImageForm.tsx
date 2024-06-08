'use client'
// modules
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import ArwForm from '@/components/arw/ArwForm'
import Uploader from '@/components/shared/Uploader'
// lib
import { debug } from '@/lib/utils/dev'
import { handleAddImage } from '@/lib/handlers/project.handlers'
import { imageSchema, ImageFormData } from '@/lib/utils/zod'
import { IProject } from '@/lib/models/project.model'
import { useUploadThing } from '@/lib/utils/uploadthing'
import { images } from '@/navigation'

export default function ImageForm({ project }: { project: IProject }) {
	const [files, setFiles] = useState<File[]>([])
	const [isUploading, setIsUploading] = useState(false)
	const { startUpload } = useUploadThing('imageUploader')
	debug(0, 0, 'Files', files)

	const form = useForm<ImageFormData>({
		resolver: zodResolver(imageSchema),
		defaultValues: {
			url: '',
		},
	})

	const handleSubmit = async () => {
		setIsUploading(true)

		if (files.length === 0) {
			handleAddImage(project, images.IMAGE)
		} else if (files.length === 1) {
			const uploadedImages = await startUpload(files)
			if (uploadedImages) {
				const { url, key, name } = uploadedImages[0]
				handleAddImage(project, url, key, name)
				debug(0, 0, uploadedImages)
			}
		} else {
			toast({
				title: 'Warning!',
				description: 'Invalid number of files.',
				variant: 'destructive',
			})
		}
		form.reset()
		setIsUploading(false)
		setFiles([])
	}

	return (
		<ArwForm
			form={form}
			onSubmit={handleSubmit}
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
