'use client'
// modules
import Image from 'next/image'
import { useEffect, useState } from 'react'
// components
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog'
import ArwText from '@/components/arw/ArwText'
import Navigation from '@/components/shared/Navigation'
// lib
import { IImage } from '@/lib/models/image.model'
import { debug } from '@/lib/utils/dev'

export default function ImageDialog({
	isOpen,
	images,
	selectedIndex,
	handleClose,
	handlePrev,
	handleNext,
}: {
	isOpen: boolean
	images: IImage[]
	selectedIndex: number
	handleClose: () => void
	handlePrev: () => void
	handleNext: () => void
}) {
	const image = images[selectedIndex]
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	useEffect(() => {
		setIsImageLoaded(false)
	}, [image])

	const handleImageLoad = () => {
		debug(9)
		setIsImageLoaded(true)
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogOverlay />
			<DialogContent className="flex-center w-full h-full p-0 bg-transparent dark:bg-transparent close-button-hidden">
				<div className="w-full h-full md:w-full-4 flex-center">
					<div onClick={handleClose} className="absolute inset-0 z-20" />
					<div className="relative flex-center md:rounded-lg overflow-hidden shadow-2xl">
						<Navigation
							prev={handlePrev}
							next={handleNext}
							back={handleClose}
							classNamePrev="absolute top-[50%] translate-y-[-50%] p-1 z-50 left-2 text-white drop-shadow-lg"
							classNameNext="absolute top-[50%] translate-y-[-50%] p-1 z-50 right-2 text-white drop-shadow-lg"
							classNameBack="absolute top-2 right-2 z-50 text-white drop-shadow-lg"
							listeners
						/>
						<Image
							src={image?.url}
							alt={image?.name}
							width={1400}
							height={1400}
							className="w-auto h-auto max-h-screen md:max-h-screen-4 object-cover"
							onLoad={handleImageLoad}
						/>
						<ArwText className="absolute bottom-4 text-white drop-shadow-lg">
							{isImageLoaded ? `${image?.name}` : 'Loading...'}
						</ArwText>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
