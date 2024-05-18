import ItemsList from '@/components/pages/ItemsList'
import { getAllItems } from '@/database/actions/item.action'
import { IItem } from '@/database/models/item.model'

export default function ItemListPage() {
	return <ItemsList />
}
