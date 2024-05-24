// components
import ItemCard from '@/components/cards/ItemCard'
import ArwContainer from '@/components/arw/ArwContainer'
// lib
import { getItemsByUser } from '@/lib/actions/item.action'
import { IItem } from '@/lib/models/item.model'

export default async function ItemsListPage() {
	const items: IItem[] = await getItemsByUser()

	if (items.length === 0) {
		return (
			<ArwContainer grow center>
				No items
			</ArwContainer>
		)
	} else {
		return (
			<ArwContainer className="grid arw-grid-auto-300 gap-3">
				{items.map((item: IItem) => (
					<ItemCard item={item} key={item._id} />
				))}
			</ArwContainer>
		)
	}
}
