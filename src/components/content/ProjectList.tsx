// modules
import Link from 'next/link'
import { Else, If, Then, When } from 'react-if'
// components
import { ArwContainer, ArwGrid, ArwIcon, ArwPaper } from '@/components/arw'
import ProjectCard from '@/components/content/items/ProjectCard'
// lib
import { debug } from '@/lib/utils/dev'
import { ICategory } from '@/lib/models/category.model'
import { Icons } from '@/lib/types/enums'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/lib/constants/paths'
import AddCard from './items/AddCard'

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
		<If condition={projects.length === 0 && !profile}>
			<Then>
				<ArwContainer center>No projects</ArwContainer>
			</Then>
			<Else>
				<ArwContainer>
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
						{profile && <AddCard />}
					</ArwGrid>
				</ArwContainer>
			</Else>
		</If>
	)
}
