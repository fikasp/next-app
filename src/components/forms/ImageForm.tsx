'use client'
// modules
import { When } from 'react-if'
import { useState } from 'react'
// components
import { Button } from '@/components/ui/button'
import Uploader from '@/components/shared/Uploader'
// lib
import { IProject } from '@/lib/models/project.model'
import { handleAddImageToProject } from '@/lib/handlers/project.handlers'
import { toastError, toastSuccess } from '@/lib/utils/toasts'
import { debug, handleError } from '@/lib/utils/dev'

export default function ImageForm({ project }: { project: IProject }) {
	const [files, setFiles] = useState<File[]>([])
	const [isUploading, setIsUploading] = useState(false)
	debug(7, 9, files)

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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

		setIsUploading(false)
		setFiles([])
	}

	return (
		<form onSubmit={handleSubmit} className="relative h-[130px] w-full">
			<Uploader files={files} setFiles={setFiles} />
			<When condition={files.length > 0}>
				<Button variant="accent" className="absolute left-3 bottom-3 w-full-3">
					{isUploading ? 'Uploading...' : 'Upload image'}
				</Button>
			</When>
		</form>
	)
}
