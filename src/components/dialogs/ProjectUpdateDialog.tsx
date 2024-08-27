// components
import ProjectForm from '@/components/forms/ProjectForm'
import {
	Dialog,
	DialogContent,
	DialogDescription,
} from '@/components/ui/dialog'
// database
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { debug } from '@/lib/utils/dev'

export default function ProjectUpdateDialog({
	project,
	categories,
	open,
	handleClose,
}: {
	project: IProject
	categories: ICategory[]
	open: boolean
	handleClose: () => void
}) {
	debug(8, 0, project)
	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="flex flex-col aspect-square w-full-4 max-h-full max-w-md">
				<ProjectForm
					project={project}
					categories={categories}
					handleClose={handleClose}
				/>
				<DialogDescription className="hidden">Project edit</DialogDescription>
			</DialogContent>
		</Dialog>
	)
}
