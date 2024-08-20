// modules
import Image from 'next/image'
import { Else, If, Then } from 'react-if'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
// components
import { Arw, ArwIcon, ArwText } from '@/components/arw'
import { Button } from '@/components/ui/button'
// lib
import { Icons } from '@/lib/types/enums'
import { cn } from '@/lib/utils'

export default function Uploader({
	files,
	setFiles,
	editMode,
}: {
	files: FileWithPath[]
	// eslint-disable-next-line no-unused-vars
	setFiles: (files: FileWithPath[]) => void
	editMode?: boolean
}) {
	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			setFiles(acceptedFiles)
		},
		[setFiles]
	)

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { 'image/*': [] },
	})

	return (
		<div {...getRootProps()} className="w-full h-full cursor-pointer">
			<input {...getInputProps()} className="z-50" />
			<If condition={files.length > 0}>
				<Then>
					<Arw className="w-full h-full flex flex-wrap justify-center">
						{files.map((file) => {
							let flexBasis = `${100 / files.length}%`
							return (
								<Image
									key={file.path}
									src={URL.createObjectURL(file)}
									alt="image"
									width={50}
									height={50}
									style={{ flex: `1 1 ${flexBasis}`, height: 'auto' }}
									className="object-cover object-center"
								/>
							)
						})}
					</Arw>
				</Then>
				<Else>
					<Arw
						className={cn(
							'h-full flex flex-col items-center justify-between p-3',
							editMode
								? 'bg-transparent'
								: 'bg-blue hover:bg-blue-600 transition duration-300 ease-in-out'
						)}
					>
						<ArwIcon
							size={40}
							icon={Icons.CloudUpload}
							className={cn(editMode && 'opacity-0')}
						/>
						<ArwText className="text-xs">Drag and drop or</ArwText>
						<Button type="button" className="w-full text-xs">
							{editMode ? 'Select image' : 'Select image(s)'}
						</Button>
					</Arw>
				</Else>
			</If>
		</div>
	)
}
