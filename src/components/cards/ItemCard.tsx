// modules
import { MouseEventHandler } from 'react'
import { When } from 'react-if'
import Link from 'next/link'
// components
import ArwButton from '@/components/arw/ArwButton'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwText from '@/components/arw/ArwText'
// lib
import { IItem } from '@/lib/models/item.model'
import { generateUrl } from '@/lib/utils'
import { icons, routes } from '@/navigation'

export default function ItemCard({
	index,
	slug,
	item,
	userMode,
	searchParams,
	handleRemove,
}: {
	slug: string
	index: number
	item: IItem
	userMode: boolean
	searchParams: any
	handleRemove: (itemId: string) => MouseEventHandler<HTMLButtonElement>
}) {
	// Generate URL
	const url = generateUrl([routes.PROJECTS, slug, item._id], searchParams)

	return (
		<ArwFlex center className="group relative rounded-md h-[150px] bg-accent">
			<Link href={url} className="absolute inset-0 z-20" />
			<ArwText className="group-hover:text-accent-400 transition">
				Item {index + 1}
			</ArwText>
			<When condition={userMode}>
				<ArwFlex className="absolute top-0 right-0 z-40 p-3">
					<ArwButton
						onClick={handleRemove(item._id)}
						src={icons.DELETE}
						className="hover:text-accent-400 transition"
					/>
				</ArwFlex>
			</When>
		</ArwFlex>
	)
}
