import ItemDetailsPage from '@/components/pages/ItemDetailsPage'

export default function Page({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	console.log("****", searchParams)
	console.log(Boolean(searchParams.user == ''))
	return (
		<ItemDetailsPage slug={params.slug} userMode={Boolean(searchParams.user == '')} />
	)
}
