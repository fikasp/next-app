import ItemPage from '@/components/pages/ItemPage'

export default function Page({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	return (
		<ItemPage
			slug={params.slug}
			userMode={searchParams.user == 'mode'}
		/>
	)
}
