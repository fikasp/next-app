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
import { ArwButton, ArwIcon } from '@/components/arw'
import ProjectDeleteDialog from '@/components/dialogs/ProjectDeleteDialog'
import ProjectUpdateDialog from '@/components/dialogs/ProjectUpdateDialog'
// lib
import { handleRemoveProjectCover } from '@/lib/handlers/project.handlers'
import { ICategory } from '@/lib/models/category.model'
import { Icons } from '@/lib/types/enums'
import { IProject } from '@/lib/models/project.model'
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
			<DropdownMenu>
				<DropdownMenuTrigger asChild className={className}>
					<div>
						<ArwButton icon={Icons.Ellipsis} size={30} />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="center">
					<DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
						<ArwIcon icon={Icons.Pencil} />
						Edit project info
					</DropdownMenuItem>
					<When condition={Boolean(project.cover)}>
						<DropdownMenuItem onClick={() => handleRemoveProjectCover(project)}>
							<ArwIcon icon={Icons.ImageDown} />
							Remove project cover
						</DropdownMenuItem>
					</When>
					<DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
						<ArwIcon icon={Icons.Trash} />
						Delete project
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<ProjectDeleteDialog
				project={project}
				handleClose={() => setIsDeleteDialogOpen(false)}
				open={isDeleteDialogOpen}
			/>
			<ProjectUpdateDialog
				project={project}
				categories={categories}
				handleClose={() => setIsUpdateDialogOpen(false)}
				open={isUpdateDialogOpen}
			/>
		</>
	)
}
