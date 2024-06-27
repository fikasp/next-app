// modules
import { When } from 'react-if'
// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
import ImageList from '@/components/lists/ImageList'
import Manipulations from '@/components/shared/Manipulations'
import Navigation from '@/components/shared/Navigation'
// lib
import { Adjacent, Result } from '@/lib/types'
import { generateUrl } from '@/lib/utils'
import { debug } from '@/lib/utils/dev'
import { getProjectBySlug } from '@/lib/actions/project.action'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/navigation'
import { getCategories } from '@/lib/actions/category.action'
import { ICategory } from '@/lib/models/category.model'

export default async function ProjectPage({
	params,
	searchParams,
	profile = false,
}: {
	params: any
	searchParams: any
	profile?: boolean
}) {
	debug(7, 9, searchParams)
	const { data: categories }: Result<ICategory[]> = await getCategories()
	const { prev, current, next }: Adjacent<IProject> = await getProjectBySlug({
		slug: params.slug,
		searchParams,
		profile,
	})

	// Generate URLs
	const route = profile ? routes.PROFILE : routes.PROJECTS
	const urlPrev = prev && generateUrl([route, prev.slug], searchParams)
	const urlNext = next && generateUrl([route, next.slug], searchParams)
	const urlBack = generateUrl([route], searchParams)

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
							urlBack={urlBack}
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
