// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwSpinner from '@/components/arw/ArwSpinner'
import Navigation from '@/components/shared/Navigation'

export default async function ImageLoading() {
	return (
		<ArwContainer>
			<ArwPaper grow className="p-5 bg-accent dark:bg-accent relative">
				<ArwSpinner accent />
				<Navigation className="absolute top-5 right-5" />
			</ArwPaper>
		</ArwContainer>
	)
}
