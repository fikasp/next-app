import ArwLink from '@/components/arw/ArwLink'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { IItem } from '@/lib/models/item.model'
import { routes } from '@/navigation'

export default function PublicItemCard({ item }: { item: IItem }) {
	return (
		<ArwPaper accent square between className="p-4">
			<ArwLink href={`${routes.HOME}/${item.slug}`}>
				<ArwTitle>{item.title}</ArwTitle>
			</ArwLink>
			<ArwText>{item.info}</ArwText>
		</ArwPaper>
	)
}
