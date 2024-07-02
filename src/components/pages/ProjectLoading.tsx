// components
import {
	ArwContainer,
	ArwFlex,
	ArwPaper,
	ArwSpinner,
	ArwTitle,
} from '@/components/arw'
import Navigation from '@/components/shared/Navigation'
// lib
import { debug } from '@/lib/utils/dev'

export default function ProjectLoading() {
	debug(4)
	return (
		<ArwContainer>
			<ArwPaper grow accent className="px-5 pb-5">
				<ArwFlex row className="justify-between items-start">
					<ArwTitle>Loading...</ArwTitle>
					<Navigation className="mt-1" />
				</ArwFlex>
				<ArwSpinner accent />
			</ArwPaper>
		</ArwContainer>
	)
}
