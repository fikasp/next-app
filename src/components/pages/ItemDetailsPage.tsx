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

export default async function ItemDetailsPage({
	slug,
	home,
}: {
	slug: string
	home?: boolean
}) {
	const { prev, current, next }: AdjacentItems = await getAdjacentItems(
		slug,
		home
	)
	const baseUrl = home ? routes.HOME : routes.ITEMS

	return (
		<ArwContainer>
			<ArwPaper grow between accent>
				<ArwTitle>{current?.title}</ArwTitle>
				<ArwText>{current?.info}</ArwText>
				<Navigation
					back={baseUrl}
					prev={prev && `${baseUrl}/${prev.slug}`}
					next={next && `${baseUrl}/${next.slug}`}
				/>
			</ArwPaper>
		</ArwContainer>
	)
}
