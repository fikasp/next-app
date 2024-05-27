// modules
import Link from 'next/link'
import { If, Then, Else, When } from 'react-if'
// components
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
import Manipulations from '@/components/shared/Manipulations'
// lib
import { IItem } from '@/lib/models/item.model'
import { routes } from '@/navigation'

export default function UserItemCard({
	item,
	userMode,
}: {
	item: IItem
	userMode?: boolean
}) {
	return (
		<ArwPaper
			accent
			square
			className="relative justify-between px-5 py-4 group max-lg:aspect-video"
		>
			<Link
				href={`${routes.ITEMS}/${item.slug}${userMode ? '?user=mode' : ''}`}
				className="absolute inset-0 z-20"
			/>
			<ArwFlex row between className="relative">
				<ArwTitle className="group-hover:text-accent transition cursor-pointer relative z-10">
					{item.title}
				</ArwTitle>
				<When condition={userMode}>
					<Manipulations item={item} className="relative z-30" />
				</When>
			</ArwFlex>
			<If condition={userMode}>
				<Then>
					<ArwText className="relative z-10">{item.info}</ArwText>
				</Then>
				<Else>
					<ArwFlex row className="items-center gap-2">
						<Avatar>
							<AvatarImage src={item.user.photo} />
						</Avatar>
						<ArwText>{item.user.username}</ArwText>
					</ArwFlex>
				</Else>
			</If>
		</ArwPaper>
	)
}
