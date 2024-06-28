'use client'
// modules
import { When } from 'react-if'
import { FormEventHandler, useState } from 'react'
// components
import { Button } from '@/components/ui/button'
import Uploader from '@/components/shared/Uploader'
// lib
import { debug, handleError } from '@/lib/utils/dev'
import { IProject } from '@/lib/models/project.model'
import { uploadImage } from '@/lib/actions/image.action'
import { handleAddImages } from '@/lib/handlers/project.handlers'

import { UploadedImage } from '@/lib/types'

export default function ImageForm({ project }: { project: IProject }) {
	const [files, setFiles] = useState<File[]>([])
	const [isUploading, setIsUploading] = useState(false)
	debug(8, 9, files)

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		debug(1)
		setIsUploading(true)

		try {
			// Prepare form data list
			const formDataList = files.map((file) => {
				const formData = new FormData()
				formData.append('file', file)
				formData.append('name', file.name)
				return formData
			})

			// Upload images
			const uploadedImages: UploadedImage[] = await Promise.all(
				formDataList.map(uploadImage)
			)
			// Add images to project
			await handleAddImages(uploadedImages, project.slug)
		} catch (error) {
			handleError(error)
		}
		setIsUploading(false)
		setFiles([])
	}

	return (
		<form onSubmit={handleSubmit} className="h-[150px] w-full relative">
			<Uploader files={files} setFiles={setFiles} />
			<When condition={files.length > 0}>
				<Button variant="accent" className="absolute left-3 bottom-3 w-full-3">
					{isUploading ? 'Uploading...' : 'Upload image'}
				</Button>
			</When>
		</form>
	)
}
