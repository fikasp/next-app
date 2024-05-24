// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
import Navigation from '@/components/shared/Navigation'
// lib
import { getAdjacentItems } from '@/lib/actions/item.action'
import { AdjacentItems } from '@/lib/types'
import { routes } from '@/navigation'

export default async function ItemDetailsPage({ slug }: { slug: string }) {
	const {prev, current, next}: AdjacentItems = await getAdjacentItems(slug)

	return (
		<ArwContainer>
			<ArwPaper grow between accent>
				<ArwTitle>{current?.title}</ArwTitle>
				<ArwText>{current?.info}</ArwText>
				<Navigation
					back={routes.ITEMS}
					prev={prev && `${routes.ITEMS}/${prev.slug}`}
					next={next && `${routes.ITEMS}/${next.slug}`}
				/>
			</ArwPaper>
		</ArwContainer>
	)
}
