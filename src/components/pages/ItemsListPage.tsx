// modules
import { Else, If, Then } from 'react-if'
// components
import ItemCard from '@/components/cards/ItemCard'
import ArwContainer from '@/components/arw/ArwContainer'
// lib
import { getItemsByUser } from '@/lib/actions/item.action'
import { IItem } from '@/lib/models/item.model'

export default async function ItemsListPage() {
	const items: IItem[] = await getItemsByUser()

	return (
		<If condition={items.length === 0}>
			<Then>
				<ArwContainer center>No items</ArwContainer>
			</Then>
			<Else>
				<ArwContainer grid className="arw-grid-auto-300 gap-3 content-start">
					{items.map((item: IItem) => (
						<ItemCard item={item} key={item._id} userMode />
					))}
				</ArwContainer>
			</Else>
		</If>
	)
}
