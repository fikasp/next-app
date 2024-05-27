// loadings
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwSpinner from '@/components/arw/ArwSpinner'
import ArwTitle from '@/components/arw/ArwTitle'
import Navigation from '@/components/shared/Navigation'
import ArwFlex from '../arw/ArwFlex'

export default function ItemLoading() {
	return (
		<ArwContainer>
			<ArwPaper grow accent className="px-5 pb-5">
				<ArwFlex row between>
					<ArwTitle>Loading...</ArwTitle>
					<Navigation className="justify-end" />
				</ArwFlex>
				<ArwSpinner accent />
			</ArwPaper>
		</ArwContainer>
	)
}
