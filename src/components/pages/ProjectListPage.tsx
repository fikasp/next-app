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
	userMode = false,
}: {
	searchParams: any
	userMode?: boolean
}) {
	debug(9, 9, searchParams)
	const projects: IProject[] = await getProjects(searchParams, userMode)

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
						userMode={userMode}
					/>
				</ArwContainer>
			</Else>
		</If>
	)
}
