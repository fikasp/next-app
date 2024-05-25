// components
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwLink from '@/components/arw/ArwLink'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'

// lib
import { IItem } from '@/lib/models/item.model'
import { routes } from '@/navigation'

export default function PublicItemCard({ item }: { item: IItem }) {
	return (
		<ArwPaper accent square className="justify-between px-5 py-4">
			<ArwLink href={`${routes.HOME}/${item.slug}`}>
				<ArwTitle>{item.title}</ArwTitle>
			</ArwLink>
			<ArwFlex row className="items-center gap-2">
				<Avatar>
					<AvatarImage src={item.user.photo} />
				</Avatar>
				<ArwText>{item.user.username}</ArwText>
			</ArwFlex>
		</ArwPaper>
	)
}
