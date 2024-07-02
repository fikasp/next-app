// components
import ProjectForm from '@/components/forms/ProjectForm'
import { Dialog, DialogContent } from '@/components/ui/dialog'
// database
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { debug } from '@/lib/utils/dev'

export default function ProjectUpdateDialog({
	project,
	categories,
	open,
	close,
}: {
	project: IProject
	categories: ICategory[]
	open: boolean
	close: () => void
}) {
	debug(8, 0, project)
	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="flex flex-col aspect-square w-full-4 max-h-full max-w-md">
				<ProjectForm project={project} categories={categories} close={close} />
			</DialogContent>
		</Dialog>
	)
}
