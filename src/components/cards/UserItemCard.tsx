'use client'
// modules
import Link from 'next/link'
import { useState } from 'react'
// components
import ArwButton from '@/components/arw/ArwButton'
import ArwFlex from '@/components/arw/ArwFlex'
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
			<ArwPaper
				accent
				square
				className="relative justify-between px-5 py-4 group"
			>
				<Link
					href={`${routes.ITEMS}/${item.slug}?user=true`}
					className="absolute inset-0 z-10"
				/>
				<ArwFlex row between className="relative z-20">
					<ArwTitle className="group-hover:text-accent transition cursor-pointer">
						{item.title}
					</ArwTitle>
					<ArwFlex row>
						<ArwButton
							className="relative z-30"
							onClick={openUpdateDialog}
							src={icons.EDIT}
						/>
						<ArwButton
							className="relative z-30"
							onClick={openDeleteDialog}
							src={icons.DELETE}
						/>
					</ArwFlex>
				</ArwFlex>
				<ArwText className="relative z-20">{item.info}</ArwText>
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
