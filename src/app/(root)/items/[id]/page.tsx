import Item from '@/components/pages/items/Item'

export default function ItemPage({ params }: { params: any }) {
	return <Item id={params.id} />
}
