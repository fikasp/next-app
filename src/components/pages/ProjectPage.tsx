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
import Navigation from '@/components/shared/Navigation'
// lib
import { Adjacent } from '@/lib/types/results'
import { DataResult } from '@/lib/types/results'
import { debug } from '@/lib/utils/dev'
import { generateUrl } from '@/lib/utils'
import { getCategories } from '@/lib/actions/category.actions'
import { getProjectBySlug } from '@/lib/actions/project.actions'
import { ICategory } from '@/lib/models/category.model'
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
	debug(6, 9, searchParams)
	const { data: categories }: DataResult<ICategory[]> = await getCategories()
	const {
		data: { prev, current, next },
	}: DataResult<Adjacent<IProject>> = await getProjectBySlug(
		params.slug,
		searchParams,
		profile
	)

	// Generate URLs
	const route = profile ? routes.PROFILE : routes.PROJECTS
	const urlPrev =
		prev && generateUrl([route, prev.slug], { ...searchParams, img: undefined })
	const urlNext =
		next && generateUrl([route, next.slug], { ...searchParams, img: undefined })
	const urlClose = generateUrl([route], searchParams)

	return (
		current && (
			<ArwContainer>
				<ArwPaper grow accent className="px-5 pb-5">
					<ArwFlex row className="justify-between items-start">
						<ArwFlex row>
							<ArwTitle>{current.title}</ArwTitle>
							<When condition={profile}>
								<Manipulations
									project={current}
									categories={categories}
									className="relative z-30"
								/>
							</When>
						</ArwFlex>
						<Navigation
							urlClose={urlClose}
							urlPrev={urlPrev}
							urlNext={urlNext}
							className="mt-1"
							listenersKey
						/>
					</ArwFlex>
					<ImageList
						project={current}
						searchParams={searchParams}
						profile={profile}
					/>
					<ArwText className="max-sm:text-center">{current.info}</ArwText>
				</ArwPaper>
			</ArwContainer>
		)
	)
}
