// modules
import { When } from 'react-if'

// components
import {
	ArwContainer,
	ArwFlex,
	ArwPaper,
	ArwText,
	ArwTitle,
} from '@/components/arw'
import ImageList from '@/components/lists/ImageList'
import Manipulations from '@/components/shared/Manipulations'
import { Nav, NavClose, NavNext, NavPrev } from '@/components/layout/Navigation'
// lib
import { Adjacent } from '@/lib/types/results'
import { DataResult } from '@/lib/types/results'
import { debug } from '@/lib/utils/dev'
import { checkIfCurrentUserIsOwner, generateUrl } from '@/lib/utils'
import { getCategories } from '@/lib/actions/category.actions'
import { getProjectBySlug } from '@/lib/actions/project.actions'
import { ICategory } from '@/lib/models/category.model'
import { icons } from '@/lib/constants/paths'
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
		params.slug,
		searchParams,
		profile
	)

	// Check if the current user is the owner of the project
	const isOwner = await checkIfCurrentUserIsOwner(current?.user)

	// Generate URLs
	const route = profile ? routes.PROFILE : routes.PROJECTS
	const urlPrev = prev && generateUrl([route, prev.slug], searchParams)
	const urlNext = next && generateUrl([route, next.slug], searchParams)
	const urlProfile = generateUrl([routes.PROFILE, params.slug], searchParams)
	const urlClose = generateUrl([route], searchParams)

	return (
		current && (
			<ArwContainer className="p-0">
				<ArwFlex
					row
					between
					className="sticky top-[75px] z-40 p-4 backdrop-blur-md items-start"
				>
					<ArwFlex row className="justify-start max-xs:max-w-[200px]">
						<ArwTitle>{current.title}</ArwTitle>
						<When condition={!profile && isOwner}>
							<Nav url={urlProfile} src={icons.USER} className="self-start mt-[6px]"/>
						</When>

						<When condition={profile}>
							<Manipulations
								project={current}
								categories={categories}
								className="z-30 self-start mt-[5px]"
							/>
						</When>
					</ArwFlex>

					<ArwFlex row className="justify-end shrink-0">
						<NavPrev url={urlPrev} size={25} keyboard touch />
						<NavNext url={urlNext} size={25} keyboard touch />
						<NavClose url={urlClose} size={30} />
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
