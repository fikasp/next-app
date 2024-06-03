// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import Navigation from '@/components/shared/Navigation'

// lib
import { generateUrl } from '@/lib/utils'
import { AdjacentImages } from '@/lib/types'
import { getAdjacentImages } from '@/lib/actions/item.action'
import { routes } from '@/navigation'

export default async function ImagePage({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	const id = params.id
	const slug = params.slug
	const { prev, next }: AdjacentImages = await getAdjacentImages(id, slug)

	const prevUrl =	prev && generateUrl([routes.ITEMS, slug, prev._id], searchParams)
	const nextUrl =	next && generateUrl([routes.ITEMS, slug, next._id], searchParams)
	const backUrl = generateUrl([routes.ITEMS, slug], searchParams)

	return (
		<ArwContainer>
			<ArwPaper
				grow
				className="p-5 bg-accent dark:bg-accent relative flex-center text-center"
			>
				Image {id}
				<Navigation
					back={backUrl}
					prev={prevUrl}
					next={nextUrl}
					className="absolute top-5 right-5"
				/>
			</ArwPaper>
		</ArwContainer>
	)
}
