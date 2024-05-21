'use client'
// modules
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// components
import { useToast } from '@/components/ui/use-toast'
import ArwIcon from '@/components/shared/common/ArwIcon'
import ArwTitle from '@/components/shared/common/ArwTitle'
// database
import { deleteItem } from '@/database/actions/item.action'
import { IItem } from '@/database/models/item.model'
// lib
import { icons, routes } from '@/navigation'

export default function ListItem({ item }: { item: IItem }) {
	const { toast } = useToast()
	const router = useRouter()

	const handleUpdate = (slug: string) => () => {
		router.push(`${routes.ITEMS}/${slug}/update`)
	}

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
		</div>
	)
}
