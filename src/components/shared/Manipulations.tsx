'use client'
// modules
import { useState } from 'react'
// components
import { ArwButton, ArwFlex } from '@/components/arw'
import ProjectDeleteDialog from '@/components/dialogs/ProjectDeleteDialog'
import ProjectUpdateDialog from '@/components/dialogs/ProjectUpdateDialog'

// lib
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { icons } from '@/lib/constants/paths'

export default function Manipulations({
	project,
	categories,
	className,
}: {
	project: IProject
	categories: ICategory[]
	className?: string
}) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

	return (
		<>
			<ArwFlex row className={className}>
				<ArwButton
					onClick={() => setIsUpdateDialogOpen(true)}
					src={icons.EDIT}
				/>
				<ArwButton
					onClick={() => setIsDeleteDialogOpen(true)}
					src={icons.DELETE}
				/>
			</ArwFlex>

			<ProjectDeleteDialog
				project={project}
				open={isDeleteDialogOpen}
				close={() => setIsDeleteDialogOpen(false)}
			/>
			<ProjectUpdateDialog
				project={project}
				categories={categories}
				open={isUpdateDialogOpen}
				close={() => setIsUpdateDialogOpen(false)}
			/>
		</>
	)
}
