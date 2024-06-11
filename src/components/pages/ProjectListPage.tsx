// modules
import { Else, If, Then } from 'react-if'
// components
import ArwContainer from '@/components/arw/ArwContainer'
import ProjectsList from '@/components/lists/ProjectList'
// lib
import { getProjects } from '@/lib/actions/project.action'
import { IProject } from '@/lib/models/project.model'

export default async function ProjectsListPage({
	searchParams,
}: {
	searchParams: any
}) {
	const projects: IProject[] = await getProjects(searchParams)

	return (
		<If condition={projects.length === 0}>
			<Then>
				<ArwContainer center>No projects</ArwContainer>
			</Then>
			<Else>
				<ArwContainer>
					<ProjectsList projects={projects} searchParams={searchParams} />
				</ArwContainer>
			</Else>
		</If>
	)
}
