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
import { useToast } from '@/components/ui/use-toast'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { deleteProject } from '@/lib/actions/project.action'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/navigation'

export default function ProjectDeleteDialog({
	project,
	open,
	close,
}: {
	project: IProject
	open: boolean
	close: () => void
}) {
	const { toast } = useToast()
	const router = useRouter()

	const handleDelete = async () => {
		const deletedProject = await deleteProject(project._id)
		toast({
			title: 'Project deleted!',
			description: `${deletedProject.title} is successfully deleted`,
		})
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
					<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
