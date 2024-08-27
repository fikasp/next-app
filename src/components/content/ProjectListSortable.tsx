'use client'
// modules
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useState, useEffect } from 'react'
// components
import { ArwContainer } from '@/components/arw'
import AddCard from '@/components/content/cards/AddCard'
import ProjectCard from '@/components/content/cards/ProjectCard'
import SortableItem from '@/components/shared/SortableItem'
// lib
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { toastSuccess } from '@/lib/utils/toasts'
import { updateProjectOrder } from '@/lib/actions/project.actions'
import { useDndSensors } from '@/lib/utils/hooks'

export default function ProjectsListSortable({
	projects,
	categories,
	searchParams,
	profile,
	admin,
}: {
	projects: IProject[]
	categories: ICategory[]
	searchParams: any
	profile: boolean
	admin: boolean
}) {
	const [projectList, setProjectList] = useState(projects)

	useEffect(() => {
		setProjectList(projects)
	}, [projects])

	const handleDragEnd = async (event: any) => {
		const { active, over } = event

		if (active.id !== over.id) {
			const oldIndex = projectList.findIndex(
				(project) => project._id === active.id
			)
			const newIndex = projectList.findIndex(
				(project) => project._id === over.id
			)

			const reorderedProjects = arrayMove(projectList, oldIndex, newIndex)
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
	}

	return (
		<ArwContainer>
			<DndContext
				sensors={useDndSensors()}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={projectList.map((project) => project._id)}>
					<div className="grid arw-grid-auto-300 gap-3">
						{projectList.map((project) => (
							<SortableItem
								key={project._id}
								id={project._id}
								className="right-2 top-1/2 -translate-y-1/2 drop-shadow text-white"
							>
								<ProjectCard
									project={project}
									categories={categories}
									searchParams={searchParams}
									profile={profile}
									admin={admin}
								/>
							</SortableItem>
						))}
						<AddCard />
					</div>
				</SortableContext>
			</DndContext>
		</ArwContainer>
	)
}
