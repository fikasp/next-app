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
import { ArwButton, ArwIconSVG } from '@/components/arw'
import ProjectDeleteDialog from '@/components/dialogs/ProjectDeleteDialog'
import ProjectUpdateDialog from '@/components/dialogs/ProjectUpdateDialog'

// lib
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { icons } from '@/lib/constants/paths'
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
					<ArwButton src={icons.DOTS3} size={30} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="flex flex-col items-start p-2">
					<DropdownMenuItem asChild className="items-start text-left">
						<ArwButton
							label="Edit"
							onClick={() => setIsUpdateDialogOpen(true)}
							src={icons.EDIT}
						/>
					</DropdownMenuItem>
					<DropdownMenuItem asChild className="text-left">
						<ArwButton
							label="Delete"
							onClick={() => setIsDeleteDialogOpen(true)}
							src={icons.DELETE}
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
