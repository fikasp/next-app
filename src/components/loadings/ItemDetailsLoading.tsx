// loadings
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwSpinner from '@/components/arw/ArwSpinner'
import ArwTitle from '@/components/arw/ArwTitle'
import Navigation from '@/components/shared/Navigation'

export default function ItemDetailsLoading() {
	return (
		<ArwContainer>
			<ArwPaper grow between accent>
				<ArwTitle>Loading...</ArwTitle>
				<ArwSpinner accent />
				<Navigation />
			</ArwPaper>
		</ArwContainer>
	)
}
