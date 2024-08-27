// modules
import { redirect } from 'next/navigation'
// components
import ProjectPage from '@/components/pages/ProjectPage'
// lib
import { checkIsAdmin } from '@/lib/utils'

export default function Page({
	params,
	searchParams,
}: {
	params: any
	searchParams: any
}) {
	if (!checkIsAdmin()) {
		redirect('/')
	} else {
		return <ProjectPage params={params} searchParams={searchParams} admin />
	}
}
