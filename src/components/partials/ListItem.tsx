'use client'
// modules
import Link from 'next/link'
// components
import ArwIcon from '@/components/shared/common/ArwIcon'
import { useToast } from '@/components/ui/use-toast'
// database
import { deleteItem } from '@/database/actions/item.action'
import { IItem } from '@/database/models/item.model'
// lib
import { icons } from '@/navigation'
import ArwTitle from '../shared/common/ArwTitle'

export default function ListItem({ item }: { item: IItem }) {
	const { toast } = useToast()

	const handleDelete = (itemId: string) => async () => {
		const deletedItem = await deleteItem(itemId)
		toast({
			title: 'Item deleted!',
			description: `${deletedItem.title} is successfully deleted`,
		})
	}
	return (
		<div className="flex flex-col justify-between aspect-square bg-accent-200 dark:bg-accent-900 rounded-xl shadow-md px-5 py-4">
			<div className="flex-between ">
				<Link href={`/items/${item._id}`} key={item._id}>
					<ArwTitle className="arw-text-hover">{item.title}</ArwTitle>
				</Link>
				<div onClick={handleDelete(item._id)} className="arw-text-hover">
					<ArwIcon src={icons.DELETE} />
				</div>
			</div>
			<div>{item.info}</div>
		</div>
	)
}
