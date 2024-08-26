'use client'
// modules
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
// components
import { ArwNavClose, ArwNavNext, ArwNavPrev, ArwText } from '@/components/arw'
import { Dialog, DialogContent } from '@/components/ui/dialog'
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
	debug(8)
	const image = images[selectedIndex - 1]
	const [isImageLoaded, setIsImageLoaded] = useState(false)
	const [imageName, setImageName] = useState('')
	const timerRef = useRef<any>(null)

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setIsImageLoaded(false)
		}, 200)

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [selectedIndex])

	const handleImageLoad = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
			setImageName(image?.name || '')
		}
		setIsImageLoaded(true)
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="flex-center w-full h-full p-0 bg-transparent dark:bg-transparent close-button-hidden">
				<div onClick={handleClose} className="absolute inset-0 z-20" />
				<Image
					src={image?.url}
					alt={image?.name}
					width={1400}
					height={1400}
					onLoad={handleImageLoad}
					className="w-auto h-auto max-h-screen md:max-h-screen-4 md:max-w-screen-4 object-cover"
					priority
				/>
				<ArwNavPrev
					keys
					scroll
					swipe
					callback={handlePrev}
					className="absolute top-1/2 -translate-y-1/2 p-1 z-50 left-0 md:left-4 xl:left-1 arw-shadow-white dark:arw-shadow-black"
					size={40}
				/>
				<ArwNavNext
					keys
					scroll
					swipe
					callback={handleNext}
					className="absolute top-1/2 -translate-y-1/2 p-1 z-50 right-0 md:right-4 xl:right-1 arw-shadow-white dark:arw-shadow-black"
					size={40}
				/>
				<ArwNavClose
					callback={handleClose}
					className="absolute top-3 right-3 z-50 arw-shadow-white dark:arw-shadow-black"
				/>
				<ArwText className="absolute bottom-4 md:bottom-6 arw-shadow-white dark:arw-shadow-black">
					{isImageLoaded ? imageName : 'Loading...'}
				</ArwText>
			</DialogContent>
		</Dialog>
	)
}
