// modules
import Image from 'next/image'
// components
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog'
import ArwText from '@/components/arw/ArwText'
import Navigation from '@/components/shared/Navigation'
// lib
import { IImage } from '@/lib/models/image.model'

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
	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogOverlay />
			<DialogContent className="flex-center w-full p-0 bg-transparent dark:bg-transparent close-button-hidden">
				<div className="w-full md:w-full-4 flex-center">
					<div onClick={handleClose} className="absolute inset-0 z-20" />
					<div className="relative flex-center md:rounded-lg overflow-hidden ">
						<Navigation
							prev={handlePrev}
							next={handleNext}
							back={handleClose}
							classNamePrev="absolute top-[50%] translate-y-[-50%] p-1 z-50 left-2 shadow text-white"
							classNameNext="absolute top-[50%] translate-y-[-50%] p-1 z-50 right-2 shadow text-white"
							classNameBack="absolute top-2 right-2 z-50 shadow text-white"
							listeners
						/>
						<Image
							src={image?.url}
							alt={image?.name}
							width={1400}
							height={1400}
							className="w-auto h-auto max-h-screen md:max-h-screen-4 object-contain border border-base-900"
						/>
						<ArwText className="absolute bottom-4 text-white shadow">
							{image?.name}
						</ArwText>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
