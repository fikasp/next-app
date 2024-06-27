'use client'
// modules
import { When } from 'react-if'
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
import { imageSchema, ImageFormData } from '@/lib/types/zod'
import { IProject } from '@/lib/models/project.model'
import { uploadImage } from '@/lib/actions/image.action'
import { handleAddImage } from '@/lib/handlers/project.handlers'

export default function ImageForm({ project }: { project: IProject }) {
	const [files, setFiles] = useState<File[]>([])
	const [isUploading, setIsUploading] = useState(false)
	debug(8)

	const form = useForm<ImageFormData>({
		resolver: zodResolver(imageSchema),
		defaultValues: {
			url: '',
		},
	})

	const handleSubmit = async () => {
		debug(9)
		setIsUploading(true)

		const formData = new FormData()
		files.forEach((file) => {
			formData.append('file', file)
		})
		const imageUrl = await uploadImage(formData)
		const imageName = files[0].name

		if (files.length === 1) {
			handleAddImage(project, imageUrl, imageName)
		} else {
			toast({
				title: 'Warning!',
				description: 'Invalid number of files.',
				variant: 'error',
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
			<When condition={files.length > 0}>
				<Button variant="accent" className="absolute left-3 bottom-3 w-full-3">
					{isUploading ? 'Uploading...' : 'Upload image'}
				</Button>
			</When>
		</ArwForm>
	)
}
