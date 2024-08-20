// modules
import Link from 'next/link'
import { When } from 'react-if'
// components
import { ArwGrid, ArwIcon, ArwPaper } from '@/components/arw'
import ProjectCard from '@/components/content/items/ProjectCard'
// lib
import { debug } from '@/lib/utils/dev'
import { ICategory } from '@/lib/models/category.model'
import { Icons } from '@/lib/types/enums'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/lib/constants/paths'

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
	debug(7)
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
			<When condition={profile}>
				<Link href={routes.ADD}>
					<ArwPaper
						square
						center
						className="max-lg:aspect-video hover:text-accent transition"
					>
						<ArwIcon icon={Icons.SquarePlus} size={50} />
					</ArwPaper>
				</Link>
			</When>
		</ArwGrid>
	)
}
