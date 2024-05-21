import ItemDetailsPage from '@/components/pages/items/ItemDetailsPage'

export default function Page({ params }: { params: any }) {
	return <ItemDetailsPage slug={params.slug} />
}
