// modules
import { redirect } from 'next/navigation'
// components
import ProjectLoading from '@/components/pages/loadings/ProjectLoading'
// lib
import { checkIsAdmin } from '@/lib/utils'

export default function Loading() {
	if (!checkIsAdmin()) {
		redirect('/')
	} else {
		return <ProjectLoading />
	}
}
