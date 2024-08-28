// modules
import { When } from 'react-if'
// components
import {
	ArwContainer,
	ArwFlex,
	ArwNav,
	ArwNavClose,
	ArwNavNext,
	ArwNavPrev,
	ArwText,
	ArwTitle,
} from '@/components/arw'
import ProjectManipulations from '@/components/shared/manipulations/ProjectManipulations'
import ImageList from '@/components/content/ImageList'
// lib
import { Adjacent } from '@/lib/types'
import {
	checkIsAdmin,
	checkIsOwner,
	generateUrl,
	getBaseRoute,
} from '@/lib/utils'
import { DataResult } from '@/lib/types'
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
	admin = false,
}: {
	params: any
	searchParams: any
	profile?: boolean
	admin?: boolean
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

	const isOwner = await checkIsOwner(current?.user)
	const isAdmin = checkIsAdmin()

	// Generate URLs
	const baseRoute = getBaseRoute(profile, admin)
	const urlPrev = prev && generateUrl([baseRoute, prev.slug], searchParams)
	const urlNext = next && generateUrl([baseRoute, next.slug], searchParams)
	const urlClose = generateUrl([baseRoute], searchParams)

	const getEditUrl = () => {
		if (isOwner)
			return generateUrl([routes.PROFILE, params.slug[0]], searchParams)
		if (isAdmin)
			return generateUrl([routes.ADMIN, params.slug[0]], searchParams)
		return null
	}

	return (
		current && (
			<ArwContainer className="p-0">
				{/* top */}
				<ArwFlex
					row
					between
					className="sticky top-[75px] z-40 p-4 backdrop-blur-md items-start"
				>
					<ArwFlex row className="justify-start">
						<ArwTitle>{current.title}</ArwTitle>
					</ArwFlex>

					<ArwFlex row className="justify-end shrink-0">
						<When condition={!admin && !profile && getEditUrl()}>
							<ArwNav url={getEditUrl()} icon={Icons.Pencil} size={20} />
						</When>
						<When condition={admin || profile}>
							<ProjectManipulations project={current} categories={categories} />
						</When>
						<ArwNavClose url={urlClose} />
					</ArwFlex>
				</ArwFlex>

				{/* center */}
				<ArwFlex className="px-4 grow">
					<ImageList
						project={current}
						profile={profile || admin}
						params={params}
					/>
				</ArwFlex>

				{/* bottom */}
				<ArwFlex
					row
					between
					className="sticky bottom-[0px] z-40 p-4 backdrop-blur-md"
				>
					<ArwNavPrev url={urlPrev} keys />
					<ArwText center>{current.info}</ArwText>
					<ArwNavNext url={urlNext} keys />
				</ArwFlex>
			</ArwContainer>
		)
	)
}
