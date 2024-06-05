import ProjectPage from '@/components/pages/ProjectPage'

export default function Page({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	return <ProjectPage params={params} searchParams={searchParams} />
}
