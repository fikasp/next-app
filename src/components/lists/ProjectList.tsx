// components
import ArwGrid from '@/components/arw/ArwGrid'
import ProjectCard from '@/components/cards/ProjectCard'
// lib
import { IProject } from '@/lib/models/project.model'

export default async function ProjectsList({
	projects,
	searchParams,
	userMode
}: {
	projects: IProject[]
	searchParams: any
	userMode: boolean
}) {
	return (
		<ArwGrid className="arw-grid-auto-300 gap-3 content-start">
			{projects.map((project: IProject) => (
				<ProjectCard
					key={project._id}
					project={project}
					searchParams={searchParams}
					userMode={userMode}
				/>
			))}
		</ArwGrid>
	)
}
