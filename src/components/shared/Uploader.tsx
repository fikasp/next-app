'use client'
// modules
import { Else, If, Then } from 'react-if'
import { FileWithPath } from 'react-dropzone'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import Image from 'next/image'
// components
import { Button } from '@/components/ui/button'
import ArwIcon from '@/components/arw/ArwIcon'
import ArwText from '@/components/arw/ArwText'
// lib
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
	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			onFieldChange(URL.createObjectURL(acceptedFiles[0]))
			setFiles(acceptedFiles)
		},
		[onFieldChange, setFiles]
	)

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		// eslint-disable-next-line no-constant-condition
		accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
	})

	return (
		<div
			{...getRootProps()}
			className="grow cursor-pointer overflow-hidden rounded-md border border-base-400 dark:border-base-800"
		>
			<input {...getInputProps()} className="cursor-pointer" />
			<If condition={imageUrl}>
				<Then>
					<div className="flex h-full w-full justify-center">
						<Image
							src={imageUrl}
							alt="image"
							width={100}
							height={100}
							className="w-full object-cover object-center"
						/>
					</div>
				</Then>
				<Else>
					<div className="h-full flex flex-col items-center justify-between p-3 bg-blue">
						<ArwIcon src={icons.UPLOAD} size={50} />
						<ArwText className="text-sm">Drag and drop or</ArwText>
						<Button type="button" className="w-full">
							Select image
						</Button>
					</div>
				</Else>
			</If>
		</div>
	)
}
