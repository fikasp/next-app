'use client'
// modules
import { Else, If, Then, When } from 'react-if'
import { useEffect, useState } from 'react'
// components
import { Arw, ArwFlex } from '@/components/arw'
import { Button } from '@/components/ui/button'
import Uploader from '@/components/shared/Uploader'
// lib
import { IProject } from '@/lib/models/project.model'
import { handleAddImageToProject } from '@/lib/handlers/project.handlers'
import { toastError, toastSuccess } from '@/lib/utils/toasts'
import { debug, handleError } from '@/lib/utils/dev'
import { IImage } from '@/lib/models/image.model'

export default function ImageForm({
	image,
	project,
	handleCancel,
}: {
	image?: IImage
	project: IProject
	handleCancel?: () => void
}) {
	const editMode = Boolean(image)
	const [files, setFiles] = useState<File[]>([])
	const [isUploading, setIsUploading] = useState(false)
	debug(8, 9, files)

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
		e
	) => {
		debug(1)
		setIsUploading(true)
		e.preventDefault()

		try {
			for (const file of files) {
				const formData = new FormData()
				formData.append('file', file)
				formData.append('name', file.name)
				await handleAddImageToProject(formData, project.slug)
			}
			toastSuccess('Images successfully added.')
		} catch (error) {
			handleError(error)
			toastError('An error occurred.')
		}
		if (handleCancel) {
			handleCancel()
		}
		setIsUploading(false)
		setFiles([])
	}

	return (
		<Arw className="relative h-[130px] w-full">
			<Uploader files={files} setFiles={setFiles} editMode={editMode} />
			<When condition={files.length > 0}>
				<Button
					variant="accent"
					className="absolute left-3 bottom-3 w-full-3"
					onClick={handleSubmit}
				>
					{isUploading ? 'Uploading...' : 'Upload image'}
				</Button>
			</When>
			<When condition={editMode}>
				<Button
					variant="secondary"
					className="absolute left-3 top-3 w-full-3 hover:bg-white dark:hover:bg-black transition"
					onClick={handleCancel}
				>
					Cancel
				</Button>
			</When>
		</Arw>
	)
}

// Convert image to file
// useEffect(() => {
// 	const loadFileFromImage = async () => {
// 		if (image && image.url) {
// 			try {
// 				const response = await fetch(image.url)
// 				const blob = await response.blob()

// 				const file = new File([blob], image.name || 'image', {
// 					type: blob.type,
// 				})
// 				setFiles([file])
// 			} catch (error) {
// 				console.error('Failed to load image file:', error)
// 			}
// 		}
// 	}
// 	loadFileFromImage()
// }, [image])