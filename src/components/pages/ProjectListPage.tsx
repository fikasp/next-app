// modules
import { Else, If, Then } from 'react-if'
// components
import ArwContainer from '@/components/arw/ArwContainer'
import ProjectsList from '@/components/lists/ProjectList'
// lib
import { getProjects } from '@/lib/actions/project.action'
import { IProject } from '@/lib/models/project.model'
import { debug } from '@/lib/utils/dev'

export default async function ProjectsListPage({
	searchParams,
	profile = false,
}: {
	searchParams: any
	profile?: boolean
}) {
	debug(0, 0, searchParams)
	const projects: IProject[] = await getProjects(searchParams, profile)

	return (
		<If condition={projects.length === 0}>
			<Then>
				<ArwContainer center>No projects</ArwContainer>
			</Then>
			<Else>
				<ArwContainer>
					<ProjectsList
						projects={projects}
						searchParams={searchParams}
						profile={profile}
					/>
				</ArwContainer>
			</Else>
		</If>
	)
}
