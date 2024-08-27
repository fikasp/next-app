// modules
import { Else, If, Then } from 'react-if'
// components
import ProjectsListSortable from '@/components/content/ProjectListSortable'
import ProjectsList from '@/components/content/ProjectList'
// lib
import { DataResult } from '@/lib/types'
import { getCategories } from '@/lib/actions/category.actions'
import { getProjects } from '@/lib/actions/project.actions'
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { debug } from '@/lib/utils/dev'

export default async function ProjectsListPage({
	searchParams,
	profile = false,
	admin = false,
}: {
	searchParams: any
	profile?: boolean
	admin?: boolean
}) {
	debug(6, 9, searchParams)

	const { data: projects }: DataResult<IProject[]> = await getProjects(
		searchParams,
		profile,
	)
	const { data: categories }: DataResult<ICategory[]> = await getCategories()

	return (
		<If condition={(profile || admin) && !searchParams.sort}>
			<Then>
				<ProjectsListSortable
					projects={projects}
					categories={categories}
					searchParams={searchParams}
					profile={profile}
					admin={admin}
				/>
			</Then>
			<Else>
				<ProjectsList
					projects={projects}
					categories={categories}
					searchParams={searchParams}
					profile={profile}
					admin={admin}
				/>
			</Else>
		</If>
	)
}
