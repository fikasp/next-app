import ItemDetailsPage from '@/components/pages/ItemDetailsPage'

export default function Page({ params }: { params: any }) {
	return <ItemDetailsPage home slug={params.slug} />
}
