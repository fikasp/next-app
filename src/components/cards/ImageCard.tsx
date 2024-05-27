// modules
import { MouseEventHandler } from 'react'
import { useMediaQuery } from 'react-responsive'
import { When } from 'react-if'
import Link from 'next/link'
// components
import ArwButton from '@/components/arw/ArwButton'
// lib
import { cn } from '@/lib/utils'
import { IImage } from '@/lib/models/image.model'
import { icons, routes } from '@/navigation'

export default function ImageCard({
	image,
	userMode,
	slug,
	handleRemove,
}: {
	image: IImage
	userMode: boolean
	slug: string
	// eslint-disable-next-line no-unused-vars
	handleRemove: (imageId: string) => MouseEventHandler<HTMLButtonElement>
}) {
	const isMobile = useMediaQuery({ maxWidth: 768 })
	return (
		<div className="group/image relative flex-center rounded-md h-[150px] bg-accent">
			<Link
				href={`${routes.ITEMS}/${slug}/${image._id}${
					userMode ? '?user=mode' : ''
				}`}
				className="absolute inset-0 z-20"
			/>
			<div>Image</div>
			<When condition={userMode}>
				<div className="group/delete absolute top-0 right-0 z-30 p-3">
					<ArwButton
						onClick={handleRemove(image._id)}
						src={icons.DELETE}
						className={cn(
							isMobile
								? 'hover:text-accent-400'
								: 'text-transparent group-hover/image:text-accent-400 group-hover/delete:text-white transition'
						)}
					/>
				</div>
			</When>
		</div>
	)
}
