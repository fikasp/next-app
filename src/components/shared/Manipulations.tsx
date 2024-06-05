'use client'
// modules
import { useState } from 'react'
// components
import ArwButton from '@/components/arw/ArwButton'
import ArwFlex from '@/components/arw/ArwFlex'
import ProjectDeleteDialog from '@/components/dialogs/ProjectDeleteDialog'
import ProjectUpdateDialog from '@/components/dialogs/ProjectUpdateDialog'

// lib
import { IProject } from '@/lib/models/project.model'
import { icons } from '@/navigation'

export default function Manipulations({
	project,
	className,
}: {
	project: IProject
	className?: string
}) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

	const openDeleteDialog = () => setIsDeleteDialogOpen(true)
	const closeDeleteDialog = () => setIsDeleteDialogOpen(false)

	const openUpdateDialog = () => setIsUpdateDialogOpen(true)
	const closeUpdateDialog = () => setIsUpdateDialogOpen(false)

	return (
		<>
			<ArwFlex row className={className}>
				<ArwButton onClick={openUpdateDialog} src={icons.EDIT} />
				<ArwButton onClick={openDeleteDialog} src={icons.DELETE} />
			</ArwFlex>

			<ProjectDeleteDialog
				project={project}
				open={isDeleteDialogOpen}
				close={closeDeleteDialog}
			/>
			<ProjectUpdateDialog
				project={project}
				open={isUpdateDialogOpen}
				close={closeUpdateDialog}
			/>
		</>
	)
}
