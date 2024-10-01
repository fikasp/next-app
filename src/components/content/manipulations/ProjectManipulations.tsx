'use client'
// modules
import { When } from 'react-if'
import { useState } from 'react'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArwButtonIcon, ArwIcon } from '@/components/arw'
import ProjectDeleteDialog from '@/components/dialogs/ProjectDeleteDialog'
import ProjectUpdateDialog from '@/components/dialogs/ProjectUpdateDialog'
// lib
import { handleRemoveProjectCover } from '@/lib/handlers/project.handlers'
import { ICategory } from '@/lib/models/category.model'
import { Icons } from '@/lib/types/enums'
import { IProject } from '@/lib/models/project.model'
import { txt } from '@/lib/constants/texts'
import { debug } from '@/lib/utils/dev'

export default function ProjectManipulations({
	project,
	categories,
	className,
}: {
	project: IProject
	categories: ICategory[]
	className?: string
}) {
	debug(8)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

	return (
		<>
			{/* Dropdown menu */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild className={className}>
					<div>
						<ArwButtonIcon icon={Icons.Ellipsis} size={30} />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="center">
					<DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
						<ArwIcon icon={Icons.Pencil} />
						{txt.manipulations.PROJECT_UPDATE}
					</DropdownMenuItem>
					<When condition={Boolean(project.cover)}>
						<DropdownMenuItem onClick={() => handleRemoveProjectCover(project)}>
							<ArwIcon icon={Icons.ImageDown} />
							{txt.manipulations.COVER_DELETE}
						</DropdownMenuItem>
					</When>
					<DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
						<ArwIcon icon={Icons.Trash} />
						{txt.manipulations.PROJECT_DELETE}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Delete dialog */}
			<When condition={isDeleteDialogOpen}>
				<ProjectDeleteDialog
					project={project}
					handleClose={() => setIsDeleteDialogOpen(false)}
					open={isDeleteDialogOpen}
				/>
			</When>

			{/* Update dialog */}
			<When condition={isUpdateDialogOpen}>
				<ProjectUpdateDialog
					project={project}
					categories={categories}
					handleClose={() => setIsUpdateDialogOpen(false)}
					open={isUpdateDialogOpen}
				/>
			</When>
		</>
	)
}
