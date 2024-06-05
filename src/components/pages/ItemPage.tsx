// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import Navigation from '@/components/shared/Navigation'
// lib
import { Adjacent } from '@/lib/types'
import { generateUrl } from '@/lib/utils'
import { getItemById } from '@/lib/actions/project.action'
import { IItem } from '@/lib/models/item.model'
import { routes } from '@/navigation'

export default async function ItemPage({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	// Get the item ID and project slug
	const slug = params.slug
	const id = params.id

	// Get the current and adjacent items
	const { prev, current, next }: Adjacent<IItem> = await getItemById(id, slug)

	// Generate URLs
	const prevUrl =
		prev && generateUrl([routes.PROJECTS, slug, prev._id], searchParams)
	const nextUrl =
		next && generateUrl([routes.PROJECTS, slug, next._id], searchParams)
	const backUrl = generateUrl([routes.PROJECTS, slug], searchParams)

	return (
		<ArwContainer>
			<ArwPaper
				grow
				className="p-5 bg-accent dark:bg-accent relative flex-center text-center"
			>
				<ArwText>Item {current?._id}</ArwText>
				<Navigation
					className="absolute top-5 right-5"
					back={backUrl}
					prev={prevUrl}
					next={nextUrl}
				/>
			</ArwPaper>
		</ArwContainer>
	)
}
