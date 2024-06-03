// components
import ItemCard from '@/components/cards/ItemCard'
import ArwContainer from '@/components/arw/ArwContainer'
// lib
import { getItems } from '@/lib/actions/item.action'
import { IItem } from '@/lib/models/item.model'

export default async function ItemsListPage({
	searchParams,
}: {
	searchParams: any
}) {
	const items: IItem[] = await getItems(searchParams)

	if (items.length === 0) {
		return <ArwContainer center>No items</ArwContainer>
	} else {
		return (
			<ArwContainer grid className="arw-grid-auto-300 gap-3 content-start">
				{items.map((item: IItem) => (
					<ItemCard item={item} key={item._id} searchParams={searchParams} />
				))}
			</ArwContainer>
		)
	}
}
