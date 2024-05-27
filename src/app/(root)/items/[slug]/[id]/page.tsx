import ImagePage from '@/components/pages/ImagePage'

export default function Page({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	return (
		<ImagePage
			id={params.id}
			slug={params.slug}
			userMode={searchParams.user == 'mode'}
		/>
	)
}
