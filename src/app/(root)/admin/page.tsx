// modules
import { redirect } from 'next/navigation'
// components
import ProjectListPage from '@/components/pages/ProjectListPage'
// lib
import { checkIsAdmin } from '@/lib/utils'

export default function Page({ searchParams }: { searchParams: any }) {
	if (!checkIsAdmin()) {
		redirect('/')
	} else {
		return <ProjectListPage searchParams={searchParams} admin />
	}
}
