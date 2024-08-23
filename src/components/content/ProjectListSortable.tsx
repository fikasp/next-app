'use client'
// modules
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// components
import { ArwContainer } from '@/components/arw'
import ProjectCard from '@/components/content/items/ProjectCard'
import AddCard from '@/components/content/items/AddCard'
// lib
import { updateProjectOrder } from '@/lib/actions/project.actions'
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { toastSuccess } from '@/lib/utils/toasts'

export default function ProjectsListSort({
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
	const [projectList, setProjectList] = useState(projects)

	const handleDragEnd = async (result: any) => {
		if (!result.destination) return

		const reorderedProjects = Array.from(projectList)
		const [removed] = reorderedProjects.splice(result.source.index, 1)
		reorderedProjects.splice(result.destination.index, 0, removed)
		setProjectList(reorderedProjects)

		const projects = reorderedProjects.map((project, index) => ({
			_id: project._id,
			order: index,
		}))

		const { success } = await updateProjectOrder(projects)
		if (success) {
			toastSuccess('Projects successfully reordered.')
		}
	}

	return (
		<ArwContainer>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="projects">
					{(provided) => (
						<div
							className="grid arw-grid-auto-300 gap-3"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{projectList.map((project, index) => (
								<Draggable
									key={project._id}
									draggableId={project._id}
									index={index}
								>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<ProjectCard
												project={project}
												categories={categories}
												searchParams={searchParams}
												profile={profile}
											/>
										</div>
									)}
								</Draggable>
							))}
							<AddCard />
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</ArwContainer>
	)
}
