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
import { routes } from '@/navigation'

function generateUrl(baseUrl: string, params: any) {
	return qs.stringifyUrl({
		url: baseUrl,
		query: params,
	})
}

export default async function ItemPage({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	const title = searchParams.title || ''

	console.log("*** title", title)
	const userMode = searchParams.user == 'mode'
	console.log("*** userMode",  userMode)

	const { prev, current, next }: AdjacentItems = await getAdjacentItems({
		slug: params.slug,
		userMode,
		title,
	})

	const queryParams = {
		...(userMode && { user: 'mode' }),
		...(title && { title }),
	}

	const prevUrl =
		prev && generateUrl(`${routes.ITEMS}/${prev.slug}`, queryParams)
	const nextUrl =
		next && generateUrl(`${routes.ITEMS}/${next.slug}`, queryParams)
	const backUrl = generateUrl(
		userMode ? routes.ITEMS : routes.START,
		queryParams
	)

	return (
		current && (
			<ArwContainer>
				<ArwPaper grow accent className="px-5 pb-5">
					<ArwFlex row between>
						<ArwTitle>{current.title}</ArwTitle>
						<Navigation back={backUrl} prev={prevUrl} next={nextUrl} />
					</ArwFlex>
					<Gallery item={current} userMode={userMode} />
				</ArwPaper>
			</ArwContainer>
		)
	)
}
