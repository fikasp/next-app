import Item from '@/components/pages/Item'

export default function ItemPage({ params }: { params: any }) {
	return <Item id={params.id} />
}
