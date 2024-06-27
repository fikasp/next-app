// components
import ArwGrid from '@/components/arw/ArwGrid'
import ProjectCard from '@/components/cards/ProjectCard'
import { ICategory } from '@/lib/models/category.model'
// lib
import { IProject } from '@/lib/models/project.model'

export default async function ProjectsList({
	projects,
	categories,
	searchParams,
	profile,
}: {
	projects: IProject[]
	categories: ICategory[] | undefined
	searchParams: any
	profile: boolean
}) {
	return (
		<ArwGrid className="arw-grid-auto-300 gap-3 content-start">
			{projects.map((project: IProject) => (
				<ProjectCard
					key={project._id}
					project={project}
					categories={categories}
					searchParams={searchParams}
					profile={profile}
				/>
			))}
		</ArwGrid>
	)
}
