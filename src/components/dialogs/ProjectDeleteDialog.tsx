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
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { handleDelete } from '@/lib/handlers/project.handlers'
import { IProject } from '@/lib/models/project.model'

export default function ProjectDeleteDialog({
	project,
	open,
	close,
}: {
	project: IProject
	open: boolean
	close: () => void
}) {
	const router = useRouter()

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
					<AlertDialogAction onClick={handleDelete(router, project, close)}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
