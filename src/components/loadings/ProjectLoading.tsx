// loadings
import ArwContainer from '@/components/arw/ArwContainer'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwSpinner from '@/components/arw/ArwSpinner'
import ArwTitle from '@/components/arw/ArwTitle'
import Navigation from '@/components/shared/Navigation'

export default function ProjectLoading() {
	return (
		<ArwContainer>
			<ArwPaper grow accent className="px-5 pb-5">
				<ArwFlex row between>
					<ArwTitle>Loading...</ArwTitle>
					<Navigation />
				</ArwFlex>
				<ArwSpinner accent />
			</ArwPaper>
		</ArwContainer>
	)
}
