// components
import ProjectPage from '@/components/pages/ProjectPage'
import IsAdmin from '@/components/pages/middlewares/IsAdmin'

export default function Page({ params, searchParams }: CatchAllSlugPageProps) {
	return (
		<IsAdmin>
			<ProjectPage params={params} searchParams={searchParams} admin />
		</IsAdmin>
	)
}
