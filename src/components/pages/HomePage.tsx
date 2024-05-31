// components
import ItemCard from '@/components/cards/ItemCard'
import ArwContainer from '@/components/arw/ArwContainer'
// lib
import { getAllItems } from '@/lib/actions/item.action'
import { IItem } from '@/lib/models/item.model'

export default async function HomePage({
	searchParams,
}: {
	searchParams: any
}) {
	const title = searchParams.title || ''
	const items: IItem[] = await getAllItems(title)

	if (items.length === 0) {
		return <ArwContainer center>No items</ArwContainer>
	} else {
		return (
			<ArwContainer grid className="arw-grid-auto-300 gap-3 content-start">
				{items.map((item: IItem) => (
					<ItemCard item={item} key={item._id} title={title} />
				))}
			</ArwContainer>
		)
	}
}
