// modules
import Link from 'next/link'
// components
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'

// lib
import { IItem } from '@/lib/models/item.model'
import { routes } from '@/navigation'

export default function PublicItemCard({ item }: { item: IItem }) {
	return (
		<Link href={`${routes.ITEMS}/${item.slug}`}>
			<ArwPaper accent square className="justify-between px-5 py-4 group">
				<ArwTitle className="group-hover:text-accent transition">{item.title}</ArwTitle>
				<ArwFlex row className="items-center gap-2">
					<Avatar>
						<AvatarImage src={item.user.photo} />
					</Avatar>
					<ArwText>{item.user.username}</ArwText>
				</ArwFlex>
			</ArwPaper>
		</Link>
	)
}
