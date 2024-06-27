// modules
import { Else, If, Then } from 'react-if'
// components
import ArwContainer from '@/components/arw/ArwContainer'
import ProjectsList from '@/components/lists/ProjectList'
// lib
import { getProjects } from '@/lib/actions/project.action'
import { IProject } from '@/lib/models/project.model'
import { debug } from '@/lib/utils/dev'
import { Result } from '@/lib/types'
import { ICategory } from '@/lib/models/category.model'
import { getCategories } from '@/lib/actions/category.action'

export default async function ProjectsListPage({
	searchParams,
	profile = false,
}: {
	searchParams: any
	profile?: boolean
}) {
	debug(7, 9, searchParams)
	const { data: projects }: Result<IProject[]> = await getProjects(
		searchParams,
		profile
	)
	const { data: categories }: Result<ICategory[]> = await getCategories()

	return (
		<If condition={projects?.length === 0}>
			<Then>
				<ArwContainer center>No projects</ArwContainer>
			</Then>
			<Else>
				<ArwContainer>
					<ProjectsList
						projects={projects!}
						categories={categories}
						searchParams={searchParams}
						profile={profile}
					/>
				</ArwContainer>
			</Else>
		</If>
	)
}
