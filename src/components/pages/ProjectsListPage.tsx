// components
import ProjectCard from '@/components/cards/ProjectCard'
import ArwContainer from '@/components/arw/ArwContainer'
// lib
import { getProjects } from '@/lib/actions/project.action'
import { IProject } from '@/lib/models/project.model'

export default async function ProjectsListPage({
	searchParams,
}: {
	searchParams: any
}) {
	const projects: IProject[] = await getProjects(searchParams)

	if (projects.length === 0) {
		return <ArwContainer center>No projects</ArwContainer>
	} else {
		return (
			<ArwContainer grid className="arw-grid-auto-300 gap-3 content-start">
				{projects.map((project: IProject) => (
					<ProjectCard
						key={project._id}
						project={project}
						searchParams={searchParams}
					/>
				))}
			</ArwContainer>
		)
	}
}
