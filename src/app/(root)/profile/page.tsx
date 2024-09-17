import ProjectListPage from '@/components/pages/ProjectListPage'

export default function Page({ searchParams }: PageProps) {
	return <ProjectListPage searchParams={searchParams} profile />
}
