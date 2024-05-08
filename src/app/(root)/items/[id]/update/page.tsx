import ItemUpdate from '@/components/pages/ItemUpdate'

export default function ItemUpdatePage({ params }: { params: any }) {
	return <ItemUpdate id={params.id} />
}
