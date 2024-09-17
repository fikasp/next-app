import ProjectPage from '@/components/pages/ProjectPage'

export default function Page({ params, searchParams }: CatchAllSlugPageProps) {
	return <ProjectPage params={params} searchParams={searchParams} />
}
