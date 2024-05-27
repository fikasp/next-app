'use client'
// modules
import { useState } from 'react'
// components
import ArwButton from '@/components/arw/ArwButton'
import ArwFlex from '@/components/arw/ArwFlex'
import ItemDeleteDialog from '@/components/dialogs/ItemDeleteDialog'
import ItemUpdateDialog from '@/components/dialogs/ItemUpdateDialog'

// lib
import { IItem } from '@/lib/models/item.model'
import { icons } from '@/navigation'

export default function Manipulations({
	item,
	className,
}: {
	item: IItem
	className?: string
}) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

	const openDeleteDialog = () => setIsDeleteDialogOpen(true)
	const closeDeleteDialog = () => setIsDeleteDialogOpen(false)

	const openUpdateDialog = () => setIsUpdateDialogOpen(true)
	const closeUpdateDialog = () => setIsUpdateDialogOpen(false)

	return (
		<>
			<ArwFlex row className={className}>
				<ArwButton onClick={openUpdateDialog} src={icons.EDIT} />
				<ArwButton onClick={openDeleteDialog} src={icons.DELETE} />
			</ArwFlex>

			<ItemDeleteDialog
				item={item}
				open={isDeleteDialogOpen}
				close={closeDeleteDialog}
			/>
			<ItemUpdateDialog
				item={item}
				open={isUpdateDialogOpen}
				close={closeUpdateDialog}
			/>
		</>
	)
}
