import ItemDetailsPage from '@/components/pages/ItemDetailsPage'

export default function Page({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	return (
		<ItemDetailsPage
			slug={params.slug}
			userMode={searchParams.user == 'true'}
		/>
	)
}
