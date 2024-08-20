// components
import { ArwContainer, ArwFlex, ArwSpinner, ArwTitle } from '@/components/arw'
import { NavClose, NavNext, NavPrev } from '@/components/layout/Navigation'
// lib
import { debug } from '@/lib/utils/dev'

export default function ProjectLoading() {
	debug(4)
	return (
		<ArwContainer className="p-0 relative">
			<ArwFlex row between className="p-4 items-start">
				<ArwTitle>Loading...</ArwTitle>
				<ArwFlex row>
					<NavPrev />
					<NavNext />
					<NavClose />
				</ArwFlex>
			</ArwFlex>
			<ArwSpinner accent absolute />
		</ArwContainer>
	)
}
