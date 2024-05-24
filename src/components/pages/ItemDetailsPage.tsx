// components
import { Button } from '@/components/ui/button'
import ArwContainer from '@/components/arw/ArwContainer'
import ArwLink from '@/components/arw/ArwLink'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { getItemBySlug } from '@/lib/actions/item.action'
import { IItem } from '@/lib/models/item.model'

export default async function ItemDetailsPage({ slug }: { slug: string }) {
	const item: IItem = await getItemBySlug(slug)

	return (
		<ArwContainer grow>
			<ArwPaper grow between accent>
				<ArwTitle>{item.title}</ArwTitle>
				<ArwText>{item.info}</ArwText>
				<ArwLink href="/items">
					<Button>Back</Button>
				</ArwLink>
			</ArwPaper>
		</ArwContainer>
	)
}
