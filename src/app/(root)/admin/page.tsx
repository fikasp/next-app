// components
import IsAdmin from '@/components/pages/middlewares/IsAdmin'
import ProjectListPage from '@/components/pages/ProjectListPage'

export default function Page({ searchParams }: PageProps) {
	return (
		<IsAdmin>
			<ProjectListPage searchParams={searchParams} admin />
		</IsAdmin>
	)
}
