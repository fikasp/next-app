// components
import IsAdmin from '@/components/pages/middlewares/IsAdmin'
import ProjectListPage from '@/components/pages/ProjectListPage'

export default function Page({ searchParams }: { searchParams: any }) {
	return (
		<IsAdmin>
			<ProjectListPage searchParams={searchParams} admin />
		</IsAdmin>
	)
}
