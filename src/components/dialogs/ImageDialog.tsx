import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogOverlay,
} from '@/components/ui/dialog'
import { IImage } from '@/lib/models/image.model'
import Image from 'next/image'
import Navigation from '../shared/Navigation'

export default function ImageDialog({
	isOpen,
	images,
	selectedIndex,
	handleClose,
	handlePrevClick,
	handleNextClick,
}: {
	isOpen: boolean
	images: IImage[]
	selectedIndex: number
	handleClose: () => void
	handlePrevClick: () => void
	handleNextClick: () => void
}) {
	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogOverlay />
			<DialogContent className="flex-center w-full p-0 bg-transparent dark:bg-transparent close-button-hidden">
				<div
					className="w-full md:w-full-4 flex-center md:rounded-md overflow-hidden "
					onClick={handleClose}
				>
					<div className="relative md:rounded-md overflow-hidden ">
						<Navigation
							prev={'/'}
							next={'/'}
							prevButtonClass="absolute top-[50%] translate-y-[-50%] p-1 z-50 left-2"
							nextButtonClass="absolute top-[50%] translate-y-[-50%] p-1 z-50 right-2"
							backButtonClass="absolute top-2 right-2"
						/>
						<Image
							src={images[selectedIndex]?.url}
							alt={images[selectedIndex]?.name}
							width={1400}
							height={1400}
							className="w-auto h-auto max-h-screen md:max-h-screen-4 object-contain"
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
