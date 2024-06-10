'use client'
// modules
import Image from 'next/image'
import { FileWithPath } from 'react-dropzone'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useCallback, Dispatch, SetStateAction } from 'react'
// components
import { Button } from '@/components/ui/button'
import ArwIcon from '@/components/arw/ArwIcon'
import { icons } from '@/navigation'

export default function Uploader({
	imageUrl,
	onFieldChange,
	setFiles,
}: {
	imageUrl: string
	onFieldChange: (url: string) => void
	setFiles: Dispatch<SetStateAction<File[]>>
}) {
	const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
		onFieldChange(URL.createObjectURL(acceptedFiles[0]))
		setFiles(acceptedFiles)
	}, [onFieldChange, setFiles])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		// eslint-disable-next-line no-constant-condition
		accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
	})

	return (
		<div
			{...getRootProps()}
			className="grow flex items-end w-full cursor-pointer overflow-hidden rounded-md border border-blue"
		>
			<input {...getInputProps()} className="cursor-pointer" />

			{imageUrl ? (
				<div className="flex h-full w-full justify-center">
					<Image
						src={imageUrl}
						alt="image"
						width={100}
						height={100}
						className="w-full object-cover object-center"
					/>
				</div>
			) : (
				<div className="w-full flex flex-col items-center p-2">
					<Image
						src={icons.UPLOAD}
						width={50}
						height={50}
						alt="file upload"
					/>
					<Button type="button" className="w-full">
						Select image
					</Button>
				</div>
			)}
		</div>
	)
}
