'use client'
// modules
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// components
import { useToast } from '@/components/ui/use-toast'
import ArwIcon from '@/components/shared/ArwIcon'
import ArwTitle from '@/components/shared/ArwTitle'
import DeleteConfirmationDialog from '@/components/modals/DeleteConfirmation'
// database
import { deleteItem } from '@/database/actions/item.action'
import { IItem } from '@/database/models/item.model'
// lib
import { icons, routes } from '@/navigation'

export default function ListItem({ item }: { item: IItem }) {
	const { toast } = useToast()
	const router = useRouter()
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null)

	const handleUpdate = (slug: string) => () => {
		router.push(`${routes.ITEMS}/${slug}/update`)
	}

	const handleDelete = (itemId: string) => () => {
		setItemIdToDelete(itemId)
		setIsDeleteDialogOpen(true)
	}

	const handleDeleteCancel = () => {
		setIsDeleteDialogOpen(false)
		setItemIdToDelete(null)
	}

	const handleDeleteConfirm = async () => {
		if (itemIdToDelete) {
			const deletedItem = await deleteItem(itemIdToDelete)
			toast({
				title: 'Item deleted!',
				description: `${deletedItem.title} is successfully deleted`,
			})
			setIsDeleteDialogOpen(false)
			setItemIdToDelete(null)
		}
	}

	return (
		<div className="flex flex-col justify-between aspect-square bg-accent-200 dark:bg-accent-900 rounded-xl shadow-md px-5 py-4">
			<div className="flex-between ">
				<Link href={`${routes.ITEMS}/${item.slug}`} key={item.slug}>
					<ArwTitle className="arw-text-hover">{item.title}</ArwTitle>
				</Link>
				<div className="flex-center gap-3">
					<div onClick={handleUpdate(item.slug)} className="arw-text-hover">
						<ArwIcon src={icons.EDIT} />
					</div>
					<div onClick={handleDelete(item._id)} className="arw-text-hover">
						<ArwIcon src={icons.DELETE} />
					</div>
				</div>
			</div>
			<div>{item.info}</div>
			<DeleteConfirmationDialog
				open={isDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				onCancel={handleDeleteCancel}
			/>
		</div>
	)
}
