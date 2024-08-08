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
		<ArwContainer className="p-0">
			<ArwFlex row between className="p-3 items-start">
				<ArwFlex row className="items-start">
					<NavPrev size={25} />
					<ArwTitle>Loading...</ArwTitle>
				</ArwFlex>
				<ArwFlex row>
					<NavClose size={30} />
					<NavNext size={25} />
				</ArwFlex>
			</ArwFlex>
			<ArwSpinner accent />
		</ArwContainer>
	)
}
