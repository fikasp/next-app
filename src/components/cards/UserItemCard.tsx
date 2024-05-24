'use client'
// modules
import { useState } from 'react'
// components
import ArwButton from '@/components/arw/ArwButton'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwLink from '@/components/arw/ArwLink'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
import ItemDeleteDialog from '@/components/dialogs/ItemDeleteDialog'
import ItemUpdateDialog from '@/components/dialogs/ItemUpdateDialog'
// lib
import { IItem } from '@/lib/models/item.model'
import { icons, routes } from '@/navigation'

export default function UserItemCard({ item }: { item: IItem }) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

	const openDeleteDialog = () => setIsDeleteDialogOpen(true)
	const closeDeleteDialog = () => setIsDeleteDialogOpen(false)

	const openUpdateDialog = () => setIsUpdateDialogOpen(true)
	const closeUpdateDialog = () => setIsUpdateDialogOpen(false)

	return (
		<>
			<ArwPaper accent square className="justify-between px-5 py-4">
				<ArwFlex row between>
					<ArwLink href={`${routes.ITEMS}/${item.slug}`}>
						<ArwTitle>{item.title}</ArwTitle>
					</ArwLink>
					<ArwFlex row>
						<ArwButton onClick={openUpdateDialog} src={icons.EDIT} />
						<ArwButton onClick={openDeleteDialog} src={icons.DELETE} />
					</ArwFlex>
				</ArwFlex>
				<ArwText>{item.info}</ArwText>
			</ArwPaper>

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
