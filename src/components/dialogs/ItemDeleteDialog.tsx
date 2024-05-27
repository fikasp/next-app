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
import { deleteItem } from '@/lib/actions/item.action'
import { IItem } from '@/lib/models/item.model'
import { routes } from '@/navigation'

export default function ItemDeleteDialog({
	item,
	open,
	close,
}: {
	item: IItem
	open: boolean
	close: () => void
}) {
	const { toast } = useToast()
	const router = useRouter()

	const handleDelete = async () => {
		const deletedItem = await deleteItem(item._id)
		toast({
			title: 'Item deleted!',
			description: `${deletedItem.title} is successfully deleted`,
		})
		router.push(routes.ITEMS)
		close()
	}

	return (
		<AlertDialog open={open} onOpenChange={close}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						<ArwTitle accent>Delete item</ArwTitle>
					</AlertDialogTitle>
					<AlertDialogDescription>
						<p>Are you sure to delete this item?</p>
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
