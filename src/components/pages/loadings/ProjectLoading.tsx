// components
import {
	ArwContainer,
	ArwFlex,
	ArwPaper,
	ArwSpinner,
	ArwTitle,
} from '@/components/arw'
import { NavClose, NavNext, NavPrev } from '@/components/layout/Navigation'
// lib
import { debug } from '@/lib/utils/dev'

export default function ProjectLoading() {
	debug(4)
	return (
		<ArwContainer>
			<ArwPaper grow accent className="px-5 pb-5">
				<ArwFlex row className="justify-between items-start">
					<ArwTitle>Loading...</ArwTitle>
					<ArwFlex between row className="mt-1">
						<NavPrev />
						<NavNext />
						<NavClose />
					</ArwFlex>
				</ArwFlex>
				<ArwSpinner accent />
			</ArwPaper>
		</ArwContainer>
	)
}
