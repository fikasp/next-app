// modules
import { useRouter } from 'next/navigation'
// components
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ArwTitle } from '@/components/arw'
// lib
import { handleDeleteProject } from '@/lib/handlers/project.handlers'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/lib/constants/paths'
import { debug } from '@/lib/utils/dev'

export default function ProjectDeleteDialog({
	project,
	open,
	close,
}: {
	project: IProject
	open: boolean
	close: () => void
}) {
	debug(8, 0, project)
	const router = useRouter()

	const handleAction = async () => {
		await handleDeleteProject(project)
		router.push(routes.PROFILE)
		close()
	}

	return (
		<AlertDialog open={open} onOpenChange={close}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						<ArwTitle accent>Delete project</ArwTitle>
					</AlertDialogTitle>
					<AlertDialogDescription>
						<p>Are you sure to delete this project?</p>
						<p>This action cannot be undone.</p>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
