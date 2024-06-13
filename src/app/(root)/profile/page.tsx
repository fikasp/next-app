import ProjectListPage from '@/components/pages/ProjectListPage'

export default function Page({ searchParams }: { searchParams: any }) {
	return <ProjectListPage searchParams={searchParams} profile />
}
