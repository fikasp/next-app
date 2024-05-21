// components
import ArwContainer from '@/components/shared/containers/ArwContainer'
import ListItem from '@/components/partials/Item'
// database
import { getItemsByUser } from '@/database/actions/item.action'
import { IItem } from '@/database/models/item.model'

export default async function ItemsListPage() {
	const items: IItem[] = await getItemsByUser()

	if (items.length === 0) {
		return <div className="text-center p-4">No items</div>
	} else {
		return (
			<ArwContainer className="grid grid-auto-300 gap-3">
				{items.map((item: IItem) => (
					<ListItem item={item} key={item._id} />
				))}
			</ArwContainer>
		)
	}
}
