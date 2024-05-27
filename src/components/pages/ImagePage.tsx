// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwPaper from '@/components/arw/ArwPaper'
import Navigation from '@/components/shared/Navigation'

// lib
import { AdjacentImages } from '@/lib/types'
import { getAdjacentImages } from '@/lib/actions/item.action'
import { routes } from '@/navigation'

export default async function ImagePage({
	id,
	slug,
	userMode,
}: {
	id: string
	slug: string
	userMode: boolean
}) {
	const { prev, next }: AdjacentImages = await getAdjacentImages(id, slug)
	
	const params = userMode ? '?user=mode' : ''
	const prevUrl = prev && `${routes.ITEMS}/${slug}/${prev._id}${params}`
	const nextUrl = next && `${routes.ITEMS}/${slug}/${next._id}${params}`
	const backUrl = `${routes.ITEMS}/${slug}${params}`

	return (
		<ArwContainer>
			<ArwPaper grow accent className="p-5">
				<ArwFlex className="grow flex-center rounded-md bg-accent p-4 text-center">Image {id}</ArwFlex>
				<Navigation back={backUrl} prev={prevUrl} next={nextUrl} />
			</ArwPaper>
		</ArwContainer>
	)
}
