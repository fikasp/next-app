// components
import {
	ArwContainer,
	ArwFlex,
	ArwNavClose,
	ArwNavNext,
	ArwNavPrev,
	ArwSpinner,
	ArwTitle,
} from '@/components/arw'
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
					<ArwNavClose />
				</ArwFlex>
			</ArwFlex>

			{/* center */}
			<ArwFlex className="grow">
				<ArwSpinner accent absolute />
			</ArwFlex>

			{/* bottm */}
			<ArwFlex row between className="p-4">
				<ArwNavPrev />
				<ArwNavNext />
			</ArwFlex>
		</ArwContainer>
	)
}
