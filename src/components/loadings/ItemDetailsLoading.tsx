// loadings
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwSpinner from '@/components/arw/ArwSpinner'
import ArwTitle from '@/components/arw/ArwTitle'
import Navigation from '@/components/shared/Navigation'
// lib
import { routes } from '@/navigation'

export default function ItemDetailsLoading({ home }: { home?: boolean }) {
	const baseUrl = home ? routes.START : routes.ITEMS
	return (
		<ArwContainer>
			<ArwPaper grow between accent>
				<ArwTitle>Loading...</ArwTitle>
				<ArwSpinner />
				<Navigation back={baseUrl} prev={baseUrl} next={baseUrl} />
			</ArwPaper>
		</ArwContainer>
	)
}
