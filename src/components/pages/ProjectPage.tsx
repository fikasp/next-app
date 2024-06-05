// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
import Items from '@/components/shared/Items'
import Navigation from '@/components/shared/Navigation'
// lib
import { Adjacent } from '@/lib/types'
import { checkUserMode, generateUrl } from '@/lib/utils'
import { getCurrentUser, getProjectBySlug } from '@/lib/actions/project.action'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/navigation'

export default async function ProjectPage({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	// Get current user
	const currentUser = await getCurrentUser()
	
	// Get adjacent projects
	const { prev, current, next }: Adjacent<IProject> = await getProjectBySlug({
		slug: params.slug,
		searchParams,
	})

	// Generate URLs
	const prevUrl =
		prev && generateUrl([routes.PROJECTS, prev.slug], searchParams)
	const nextUrl =
		next && generateUrl([routes.PROJECTS, next.slug], searchParams)
	const backUrl = generateUrl(
		[checkUserMode(searchParams) ? routes.PROJECTS : routes.START],
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
					<Items
						searchParams={searchParams}
						currentUser={currentUser}
						project={current}
					/>
					<ArwText>{current.info}</ArwText>
				</ArwPaper>
			</ArwContainer>
		)
	)
}
