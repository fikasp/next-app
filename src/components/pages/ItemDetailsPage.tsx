// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
import Navigation from '@/components/shared/Navigation'
// lib
import { AdjacentItems } from '@/lib/types'
import { getAdjacentItems } from '@/lib/actions/item.action'
import { routes } from '@/navigation'

// prettier-ignore
export default async function ItemDetailsPage({
	slug,
	userMode,
}: {
	slug: string
	userMode: boolean
}) {
	const { prev, current, next }: AdjacentItems = await getAdjacentItems(slug, userMode)
	const backUrl = userMode ? routes.ITEMS : routes.START
	const prevUrl =	prev && `${routes.ITEMS}/${prev.slug}${userMode ? '?user=true' : ''}`
	const nextUrl =	next && `${routes.ITEMS}/${next.slug}${userMode ? '?user=true' : ''}`

	return (
		<ArwContainer>
			<ArwPaper grow between accent>
				<ArwTitle>{current?.title}</ArwTitle>
				<ArwText>{current?.info}</ArwText>
				<Navigation back={backUrl} prev={prevUrl} next={nextUrl} />
			</ArwPaper>
		</ArwContainer>
	)
}
