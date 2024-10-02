'use client'
// modules
import { usePathname, useRouter } from 'next/navigation'
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
import { extractBaseRoute } from '@/lib/utils'
import { txt } from '@/lib/constants/texts'
import { debug } from '@/lib/utils/dev'

export default function ProjectDeleteDialog({
	project,
	open,
	handleClose,
}: {
	project: IProject
	open: boolean
	handleClose: () => void
}) {
	debug(8, 0, project)
	const router = useRouter()
	const pathname = usePathname()

	const handleDelete = async () => {
		await handleDeleteProject(project)
		router.push(extractBaseRoute(pathname))
		handleClose()
	}

	return (
		<AlertDialog open={open} onOpenChange={handleClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						<ArwTitle accent>{txt.manipulations.PROJECT_DELETE}</ArwTitle>
					</AlertDialogTitle>
					<AlertDialogDescription>
						<p>{txt.dialogs.DELETE_NOTIFICATION_1}</p>
						<p>{txt.dialogs.DELETE_NOTIFICATION_2}</p>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleClose}>
						{txt.common.CANCEL}
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>
						{txt.common.CONTINUE}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
