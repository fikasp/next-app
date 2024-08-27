// components
import IsAdmin from '@/components/pages/middlewares/IsAdmin'
import ProjectLoading from '@/components/pages/loadings/ProjectLoading'

export default function Loading() {
	return (
		<IsAdmin>
			<ProjectLoading />
		</IsAdmin>
	)
}
