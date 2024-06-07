// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwSpinner from '@/components/arw/ArwSpinner'
import Navigation from '@/components/shared/Navigation'

export default async function ImageLoading() {
	return (
		<div className="fixed h-screen w-screen top-0 left-0 flex-center z-50 backdrop-blur-md">
			<ArwSpinner accent />
		</div>
	)
}
