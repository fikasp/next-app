import ImagePage from '@/components/pages/ImagePage'

export default function Page({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	return <ImagePage params={params} searchParams={searchParams} />
}
