import ItemUpdate from '@/components/pages/items/ItemUpdate'

export default function ItemUpdatePage({ params }: { params: any }) {
	return <ItemUpdate id={params.id} />
}
