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
			<ArwContainer>
				<ArwPaper grow accent className="px-5 pb-5">
					<ArwFlex row className="justify-between items-start">
						<ArwFlex row>
							<ArwTitle>{current.title}</ArwTitle>
							<When condition={!profile && isOwner}>
								<Nav url={urlProfile} src={icons.USER} />
							</When>
							<When condition={profile}>
								<Manipulations
									project={current}
									categories={categories}
									className="relative z-30"
								/>
							</When>
						</ArwFlex>
						<ArwFlex between row className="mt-1">
							<NavPrev url={urlPrev} />
							<NavNext url={urlNext} />
							<NavClose url={urlClose} />
						</ArwFlex>
					</ArwFlex>
					<ImageList project={current} profile={profile} params={params} />
					<ArwText className="max-sm:text-center">{current.info}</ArwText>
				</ArwPaper>
			</ArwContainer>
		)
	)
}
