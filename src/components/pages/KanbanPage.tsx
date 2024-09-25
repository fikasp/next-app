// components
import { ArwContainer, ArwPaper } from '@/components/arw'
// lib
import { debug } from '@/lib/utils/dev'

export default async function KanbanPage() {
	debug(6)
	return (
		<ArwContainer center>
			<ArwPaper center square>
				Kanban board
			</ArwPaper>
		</ArwContainer>
	)
}
