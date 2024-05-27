// components
import ArwSpinner from '@/components/arw/ArwSpinner'
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import Navigation from '@/components/shared/Navigation'

export default async function ImageLoading() {
	return (
		<ArwContainer>
			<ArwPaper grow accent className="p-5">
				<div className="grow flex-center rounded-md bg-accent">
					<ArwSpinner accent />
				</div>
				<Navigation />
			</ArwPaper>
		</ArwContainer>
	)
}
