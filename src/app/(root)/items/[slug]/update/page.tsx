import ItemUpdatePage from '@/components/pages/items/ItemUpdatePage'

export default function Page({ params }: { params: any }) {
	return <ItemUpdatePage slug={params.slug} />
}
