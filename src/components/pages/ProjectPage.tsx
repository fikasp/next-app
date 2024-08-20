// modules
import { When } from 'react-if'
// components
import { ArwContainer, ArwFlex, ArwText, ArwTitle } from '@/components/arw'
import { Nav, NavClose, NavNext, NavPrev } from '@/components/layout/Navigation'
import ProjectManipulations from '@/components/shared/ProjectManipulations'
import ImageList from '@/components/content/ImageList'
// lib
import { Adjacent } from '@/lib/types/results'
import { checkIfCurrentUserIsOwner, generateUrl } from '@/lib/utils'
import { DataResult } from '@/lib/types/results'
import { debug } from '@/lib/utils/dev'
import { getCategories } from '@/lib/actions/category.actions'
import { getProjectBySlug } from '@/lib/actions/project.actions'
import { ICategory } from '@/lib/models/category.model'
import { Icons } from '@/lib/types/enums'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/lib/constants/paths'

export default async function ProjectPage({
	params,
	searchParams,
	profile = false,
}: {
	params: any
	searchParams: any
	profile?: boolean
}) {
	debug(6, 9, params, searchParams)
	const { data: categories }: DataResult<ICategory[]> = await getCategories()
	const {
		data: { prev, current, next },
	}: DataResult<Adjacent<IProject>> = await getProjectBySlug(
		params.slug[0],
		searchParams,
		profile
	)

	// Check if the current user is the owner of the project
	const isOwner = await checkIfCurrentUserIsOwner(current?.user)

	// Generate URLs
	const route = profile ? routes.PROFILE : routes.PROJECTS
	const urlPrev = prev && generateUrl([route, prev.slug], searchParams)
	const urlNext = next && generateUrl([route, next.slug], searchParams)
	const urlProfile = generateUrl([routes.PROFILE, params.slug[0]], searchParams)
	const urlClose = generateUrl([route], searchParams)

	return (
		current && (
			<ArwContainer className="p-0">
				<ArwFlex
					row
					between
					className="sticky top-[75px] z-40 p-4 backdrop-blur-md items-start"
				>
					<ArwFlex row className="justify-start ">
						<ArwTitle className="max-xs:max-w-[128px]">
							{current.title}
						</ArwTitle>
						<When condition={!profile && isOwner}>
							<Nav
								url={urlProfile}
								icon={Icons.Pencil}
								className="self-start mt-[4px]"
							/>
						</When>

						<When condition={profile}>
							<ProjectManipulations
								project={current}
								categories={categories}
								className="z-30 self-start"
							/>
						</When>
					</ArwFlex>

					<ArwFlex row className="justify-end shrink-0">
						<NavPrev url={urlPrev} keys swipe />
						<NavNext url={urlNext} keys swipe />
						<NavClose url={urlClose} />
					</ArwFlex>
				</ArwFlex>

				<ArwFlex className="px-4 grow">
					<ImageList project={current} profile={profile} params={params} />
				</ArwFlex>

				<ArwFlex row center className="p-4">
					<ArwText>{current.info}</ArwText>
				</ArwFlex>
			</ArwContainer>
		)
	)
}
