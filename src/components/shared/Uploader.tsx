// modules
import Image from 'next/image'
import { Else, If, Then } from 'react-if'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
// components
import { ArwIcon, ArwText } from '@/components/arw'
import { Button } from '@/components/ui/button'
// lib
import { icons } from '@/lib/constants/paths'

export default function Uploader({
	files,
	setFiles,
}: {
	files: FileWithPath[]
	// eslint-disable-next-line no-unused-vars
	setFiles: (files: FileWithPath[]) => void
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
		<div
			{...getRootProps()}
			className="w-full h-full cursor-pointer overflow-hidden rounded-md border border-base-400 dark:border-base-800"
		>
			<input {...getInputProps()} className="z-50" />
			<If condition={files.length > 0}>
				<Then>
					<div className="w-full h-full flex flex-wrap justify-center">
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
					</div>
				</Then>
				<Else>
					<div className="h-full flex flex-col items-center justify-between p-3 bg-blue">
						<ArwIcon src={icons.UPLOAD} size={40} />
						<ArwText className="text-xs">Drag and drop or</ArwText>
						<Button type="button" className="w-full text-xs">
							Select image(s)
						</Button>
					</div>
				</Else>
			</If>
		</div>
	)
}
