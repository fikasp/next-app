'use client'
// modules
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
// components
import { ArwText } from '@/components/arw'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { NavClose, NavNext, NavPrev } from '@/components/layout/Navigation'
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
	const timerRef = useRef<any>(null)

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setIsImageLoaded(false)
		}, 1000)

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [selectedIndex])

	const handleImageLoad = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
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
				<NavPrev
					keys
					scroll
					swipe
					callback={handlePrev}
					className="absolute top-1/2 -translate-y-1/2 p-1 z-50 left-0 md:left-4 xl:left-3 arw-shadow-white dark:arw-shadow-black"
					size={40}
				/>
				<NavNext
					keys
					scroll
					swipe
					callback={handleNext}
					className="absolute top-1/2 -translate-y-1/2 p-1 z-50 right-0 md:right-4 xl:right-3 arw-shadow-white dark:arw-shadow-black"
					size={40}
				/>
				<NavClose
					callback={handleClose}
					className="absolute top-3 right-3 z-50 arw-shadow-white dark:arw-shadow-black"
				/>
				<ArwText className="absolute bottom-4 md:bottom-6 arw-shadow-white dark:arw-shadow-black">
					{isImageLoaded ? `${image?.name}` : 'Loading...'}
				</ArwText>
			</DialogContent>
		</Dialog>
	)
}
