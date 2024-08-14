'use client'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArwButton } from '@/components/arw'
// lib
import { handleRemoveImageFromProject } from '@/lib/handlers/project.handlers'
import { Icons } from '@/lib/types/enums'
import { debug } from '@/lib/utils/dev'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'

export default function ImageManipulations({
	className,
	project,
	image,
}: {
	className?: string
	project: IProject
	image: IImage
}) {
	debug(8)
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className={className}>
					<div>
						<ArwButton
							size={30}
							icon={Icons.Ellipsis}
							className="arw-shadow-black text-white py-2 px-4"
						/>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="p-1">
					<DropdownMenuItem asChild>
						<ArwButton
							label="Edit"
							onClick={() => console.log('Edit')}
							icon={Icons.Pencil}
						/>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<ArwButton
							label="Delete"
							onClick={() => handleRemoveImageFromProject(project, image)}
							icon={Icons.Trash}
						/>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
