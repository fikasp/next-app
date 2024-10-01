'use client'
// modules
import { When } from 'react-if'
// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArwButtonIcon, ArwIcon } from '@/components/arw'
// lib
import {
	handleRemoveImageFromProject,
	handleSetProjectCover,
} from '@/lib/handlers/project.handlers'
import { Icons } from '@/lib/types/enums'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'
import { txt } from '@/lib/constants/texts'
import { debug } from '@/lib/utils/dev'

export default function ImageManipulations({
	className,
	project,
	image,
	handleEdit,
}: {
	className?: string
	project: IProject
	image: IImage
	// eslint-disable-next-line no-unused-vars
	handleEdit: (image: IImage) => void
}) {
	debug(8)
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className={className}>
					<div>
						<ArwButtonIcon
							size={30}
							icon={Icons.Ellipsis}
							className="text-white drop-shadow py-2 px-4"
						/>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="center" className="p-1">
					<DropdownMenuItem onClick={() => handleEdit(image)}>
						<ArwIcon icon={Icons.RefreshCw} /> {txt.manipulations.IMAGE_UPDATE}
					</DropdownMenuItem>
					<When condition={Boolean(project?.cover?._id !== image._id)}>
						<DropdownMenuItem
							onClick={() => handleSetProjectCover(project, image)}
						>
							<ArwIcon icon={Icons.ImageUp} />
							{txt.manipulations.COVER_CREATE}
						</DropdownMenuItem>
					</When>
					<DropdownMenuItem
						onClick={() => handleRemoveImageFromProject(project, image)}
					>
						<ArwIcon icon={Icons.Trash} />
						{txt.manipulations.IMAGE_DELETE}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
