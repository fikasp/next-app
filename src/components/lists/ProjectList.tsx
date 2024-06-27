// components
import ArwGrid from '@/components/arw/ArwGrid'
import ProjectCard from '@/components/cards/ProjectCard'
import { ICategory } from '@/lib/models/category.model'
// lib
import { IProject } from '@/lib/models/project.model'
import { debug } from '@/lib/utils/dev'

export default async function ProjectsList({
	projects,
	categories,
	searchParams,
	profile,
}: {
	projects: IProject[]
	categories: ICategory[]
	searchParams: any
	profile: boolean
}) {
	debug(8)
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
