// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwTitle from '@/components/arw/ArwTitle'
import Gallery from '@/components/shared/Gallery'
import Navigation from '@/components/shared/Navigation'
import Manipulations from '@/components/shared/Manipulations'
// lib
import { AdjacentItems } from '@/lib/types'
import { getAdjacentItems } from '@/lib/actions/item.action'
import { routes } from '@/navigation'
import { When } from 'react-if'

export default async function ItemPage({
	slug,
	userMode,
}: {
	slug: string
	userMode: boolean
}) {
	const { prev, current, next }: AdjacentItems = await getAdjacentItems(
		slug,
		userMode
	)
	const params = userMode ? '?user=mode' : ''
	const prevUrl = prev && `${routes.ITEMS}/${prev.slug}${params}`
	const nextUrl = next && `${routes.ITEMS}/${next.slug}${params}`
	const backUrl = userMode ? routes.ITEMS : routes.START

	return (
		current && (
			<ArwContainer>
				<ArwPaper grow accent className="px-5 pb-5">
					<ArwFlex row between>
						<ArwTitle>{current.title}</ArwTitle>
						<When condition={userMode}>
							<Manipulations item={current} />
						</When>
					</ArwFlex>
					<Gallery item={current} userMode={userMode} />
					<Navigation
						back={backUrl}
						prev={prevUrl}
						next={nextUrl}
						className="justify-end"
					/>
				</ArwPaper>
			</ArwContainer>
		)
	)
}
