'use client'
// modules
import Link from 'next/link'
import { useState } from 'react'
// components
import ArwIcon from '@/components/shared/ArwIcon'
import ArwTitle from '@/components/shared/ArwTitle'
import ItemDeleteModal from '@/components/modals/ItemDeleteModal'
import ItemUpdateModal from '@/components/modals/ItemUpdateModal'
// database
import { IItem } from '@/database/models/item.model'
// lib
import { icons, routes } from '@/navigation'

export default function ListItem({ item }: { item: IItem }) {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)

	return (
		<div className="flex flex-col justify-between aspect-square bg-accent-200 dark:bg-accent-900 rounded-xl shadow-md px-5 py-4">
			<div className="flex-between ">
				<Link href={`${routes.ITEMS}/${item.slug}`} key={item.slug}>
					<ArwTitle className="arw-text-hover">{item.title}</ArwTitle>
				</Link>
				<div className="flex-center gap-3">
					<div onClick={() => setIsUpdateOpen(true)} className="arw-text-hover">
						<ArwIcon src={icons.EDIT} />
					</div>
					<div onClick={() => setIsDeleteOpen(true)} className="arw-text-hover">
						<ArwIcon src={icons.DELETE} />
					</div>
				</div>
			</div>
			<div>{item.info}</div>

			<ItemDeleteModal
				item={item}
				open={isDeleteOpen}
				close={() => setIsDeleteOpen(false)}
			/>
			<ItemUpdateModal
				item={item}
				open={isUpdateOpen}
				close={() => setIsUpdateOpen(false)}
			/>
		</div>
	)
}
