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
	const image = images[selectedIndex]
	const [isImageLoaded, setIsImageLoaded] = useState(false)
	const timerRef = useRef<any>(null)

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setIsImageLoaded(false)
		}, 500)

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
				<div className="w-full h-full md:w-full-4 flex-center">
					<div onClick={handleClose} className="absolute inset-0 z-20" />
					<div className="relative flex-center overflow-hidden">
						<NavPrev
							keyboard
							scroll
							touch
							callback={handlePrev}
							className="absolute top-[50%] translate-y-[-50%] p-1 z-50 left-2 text-white drop-shadow-lg"
							size={30}
						/>
						<NavNext
							keyboard
							scroll
							touch
							callback={handleNext}
							className="absolute top-[50%] translate-y-[-50%] p-1 z-50 right-2 text-white drop-shadow-lg"
							size={30}
						/>
						<NavClose
							callback={handleClose}
							className="absolute top-2 right-2 z-50 text-white drop-shadow-lg"
							size={30}
						/>
						<Image
							src={image?.url}
							alt={image?.name}
							width={1400}
							height={1400}
							onLoad={handleImageLoad}
							className="w-auto h-auto max-h-screen md:max-h-screen-4 object-cover"
							priority
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
