// modules
import { MouseEventHandler } from 'react'
import { When } from 'react-if'
import Link from 'next/link'
// components
import ArwButton from '@/components/arw/ArwButton'
// lib
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
	return (
		<div className="group relative flex-center rounded-md h-[150px] bg-accent">
			<Link
				href={`${routes.ITEMS}/${slug}/${image._id}${
					userMode ? '?user=mode' : ''
				}`}
				className="absolute inset-0 z-20"
			/>
			<div className="group-hover:text-accent-400 transition">Image</div>
			<When condition={userMode}>
				<div className="absolute top-0 right-0 z-40 p-3">
					<ArwButton
						onClick={handleRemove(image._id)}
						src={icons.DELETE}
						className="hover:text-accent-400 transition"
					/>
				</div>
			</When>
		</div>
	)
}
