'use client'
// modules
import { When } from 'react-if'
import { useState } from 'react'
import Image from 'next/image'
// components
import { ArwFlex } from '@/components/arw'
import { Button } from '@/components/ui/button'
import Uploader from '@/components/shared/Uploader'
// lib
import {
	handleAddImageToProject,
	handleUpdateImageInProject,
} from '@/lib/handlers/project.handlers'
import { createFilesFormData, loadImage } from '@/lib/utils'
import { debug, handleError } from '@/lib/utils/dev'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'

export default function ImageForm({
	image,
	project,
	handleClose,
	handleUpdate,
}: {
	image?: IImage
	project: IProject
	handleClose?: () => void
	// eslint-disable-next-line no-unused-vars
	handleUpdate?: (image: IImage) => void
}) {
	const editMode = Boolean(image)
	const [files, setFiles] = useState<File[]>([])
	const [isUploading, setIsUploading] = useState(false)
	debug(8, 9, files)

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
		setIsUploading(true)
		debug(1)

		try {
			// Edit mode
			if (image && handleUpdate) {
				const formData = createFilesFormData(files[0])
				const updatedImage = await handleUpdateImageInProject(formData, image)
				if (updatedImage) {
					handleUpdate(updatedImage)
				}
			} else {
				// Add mode
				for (const file of files) {
					const formData = createFilesFormData(file)
					const addedImage = await handleAddImageToProject(
						formData,
						project.slug
					)
					if (addedImage) {
						setIsUploading(false)
						setFiles([])
					}
				}
			}
		} catch (error) {
			console.error(handleError(error))
		}
	}

	return (
		<ArwFlex
			center
			className="group relative rounded-md h-[130px] w-full bg-transparent border border-base-400 dark:border-base-800 overflow-hidden"
		>
			<div className="absolute inset-0 z-10">
				<Uploader files={files} setFiles={setFiles} editMode={editMode} />
			</div>
			<When condition={files.length > 0}>
				<Button
					variant="accent"
					className="absolute left-3 bottom-3 w-full-3 z-20"
					onClick={handleSubmit}
				>
					{isUploading ? 'Uploading...' : 'Upload image'}
				</Button>
			</When>
			<When condition={editMode}>
				<div className="flex h-full w-full transition duration-300 ease-in-out gap-0 overflow-hidden">
					<Image
						loader={loadImage('w_300,q_30')}
						src={image?.url || ''}
						height={300}
						width={300}
						alt={'Image'}
						className="w-full object-cover object-center opacity-50"
						priority
					></Image>
				</div>
				<Button
					variant="secondary"
					className="absolute left-3 top-3 w-full-3 z-30"
					onClick={handleClose}
				>
					Cancel
				</Button>
			</When>
		</ArwFlex>
	)
}
