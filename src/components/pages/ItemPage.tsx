// modules
import qs from 'query-string'
// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwTitle from '@/components/arw/ArwTitle'
import Gallery from '@/components/shared/Gallery'
import Navigation from '@/components/shared/Navigation'
// lib
import { AdjacentItems } from '@/lib/types'
import { getAdjacentItems } from '@/lib/actions/item.action'
import { checkUserMode, generateUrl } from '@/lib/utils'
import { routes } from '@/navigation'

export default async function ItemPage({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	const { prev, current, next }: AdjacentItems = await getAdjacentItems({
		slug: params.slug,
		searchParams,
	})

	const prevUrl = prev && generateUrl([routes.ITEMS, prev.slug], searchParams)
	const nextUrl = next && generateUrl([routes.ITEMS, next.slug], searchParams)
	const backUrl = generateUrl(
		[checkUserMode(searchParams) ? routes.ITEMS : routes.START],
		searchParams
	)

	return (
		current && (
			<ArwContainer>
				<ArwPaper grow accent className="px-5 pb-5">
					<ArwFlex row between>
						<ArwTitle>{current.title}</ArwTitle>
						<Navigation back={backUrl} prev={prevUrl} next={nextUrl} />
					</ArwFlex>
					<Gallery searchParams={searchParams} item={current} />
				</ArwPaper>
			</ArwContainer>
		)
	)
}
