'use client'
// modules
import { useState } from 'react'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArwButton } from '@/components/arw'
import ProjectDeleteDialog from '@/components/dialogs/ProjectDeleteDialog'
import ProjectUpdateDialog from '@/components/dialogs/ProjectUpdateDialog'

// lib
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { Icons } from '@/lib/types/enums'
import { debug } from '@/lib/utils/dev'

export default function Manipulations({
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
				<DropdownMenuTrigger className={className}>
					<ArwButton icon={Icons.Ellipsis} size={30} />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="p-1">
					<DropdownMenuItem asChild>
						<ArwButton
							label="Edit"
							onClick={() => setIsUpdateDialogOpen(true)}
							className="justify-start"
							icon={Icons.Pencil}
						/>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<ArwButton
							label="Delete"
							onClick={() => setIsDeleteDialogOpen(true)}
							className="justify-start"
							icon={Icons.Trash}
						/>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

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
