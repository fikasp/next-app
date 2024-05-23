import ItemUpdatePage from '@/components/pages/ItemUpdatePage'

export default function Page({ params }: { params: any }) {
	return <ItemUpdatePage slug={params.slug} />
}
