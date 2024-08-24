// components
import { ArwContainer, ArwFlex, ArwSpinner, ArwTitle } from '@/components/arw'
import { NavClose, NavNext, NavPrev } from '@/components/layout/Navigation'
// lib
import { debug } from '@/lib/utils/dev'

export default function ProjectLoading() {
	debug(4)
	return (
		<ArwContainer className="p-0 relative">
			{/* top */}
			<ArwFlex row between className="p-4">
				<ArwTitle>Loading...</ArwTitle>
				<ArwFlex row>
					<NavClose />
				</ArwFlex>
			</ArwFlex>

			{/* center */}
			<ArwFlex className="grow">
				<ArwSpinner accent absolute />
			</ArwFlex>

			{/* bottm */}
			<ArwFlex row between className="p-4">
				<NavPrev />
				<NavNext />
			</ArwFlex>
		</ArwContainer>
	)
}
