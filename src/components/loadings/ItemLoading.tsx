// loadings
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwSpinner from '@/components/arw/ArwSpinner'
import ArwTitle from '@/components/arw/ArwTitle'
import Navigation from '@/components/shared/Navigation'

export default function ItemLoading() {
	return (
		<ArwContainer>
			<ArwPaper grow accent className="px-5 pb-5">
				<ArwTitle>Loading...</ArwTitle>
				<ArwSpinner accent />
				<Navigation />
			</ArwPaper>
		</ArwContainer>
	)
}
