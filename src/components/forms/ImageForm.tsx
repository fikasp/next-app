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
import { cn, loadImage } from '@/lib/utils'
import { debug, handleError } from '@/lib/utils/dev'
import { IProject } from '@/lib/models/project.model'
import { IImage } from '@/lib/models/image.model'

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
	const [uploadedCount, setUploadedCount] = useState(0)
	debug(8, 9, files)

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
		setIsUploading(true)
		debug(1)

		try {
			// Edit mode
			if (image && handleUpdate) {
				const updatedImage = await handleUpdateImageInProject(files[0], image)
				if (updatedImage) {
					handleUpdate(updatedImage)
				}
			} else {
				// Add mode
				for (const file of files) {
					await handleAddImageToProject(file, project.slug)
					setUploadedCount((prev) => prev + 1)
				}
				setUploadedCount(0)
				setIsUploading(false)
				setFiles([])
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
					className={cn('absolute left-3 bottom-3 w-full-3 z-20 text-xs')}
					onClick={handleSubmit}
				>
					{isUploading
						? files.length == 1 || editMode
							? 'Uploading...'
							: `Uploading... ${uploadedCount}/${files.length}`
						: files.length == 1
						? 'Upload image'
						: 'Upload images'}
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
