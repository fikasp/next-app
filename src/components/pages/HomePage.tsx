// components
import HomeItemCard from '@/components/cards/HomeItemCard'
import ArwContainer from '@/components/arw/ArwContainer'
// lib
import { getAllItems } from '@/lib/actions/item.action'
import { IItem } from '@/lib/models/item.model'

export default async function HomePage() {
	const items: IItem[] = await getAllItems()

	if (items.length === 0) {
		return <ArwContainer center>No items</ArwContainer>
	} else {
		return (
			<ArwContainer grid className="arw-grid-auto-300 gap-3 content-start">
				{items.map((item: IItem) => (
					<HomeItemCard item={item} key={item._id} />
				))}
			</ArwContainer>
		)
	}
}
