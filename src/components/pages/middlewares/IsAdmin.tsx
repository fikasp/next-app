// modules
import { redirect } from 'next/navigation'
// lib
import { checkIsAdmin } from '@/lib/utils'

export default function IsAdmin({ children }: { children: React.ReactNode }) {
	if (!checkIsAdmin()) {
		redirect('/')
	}
	return <>{children}</>
}
