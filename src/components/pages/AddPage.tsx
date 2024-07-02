// components
import { ArwContainer, ArwPaper } from '@/components/arw'
import ProjectForm from '@/components/forms/ProjectForm'
// lib
import { DataResult } from '@/lib/types/results'
import { getCategories } from '@/lib/actions/category.actions'
import { ICategory } from '@/lib/models/category.model'
import { debug } from '@/lib/utils/dev'

export default async function AddPage() {
	debug(6)
	const { data: categories }: DataResult<ICategory[]> = await getCategories()
	return (
		<ArwContainer center>
			<ArwPaper className="w-full-4 max-w-md min-h-md border dark:border-none p-8">
				<ProjectForm categories={categories} />
			</ArwPaper>
		</ArwContainer>
	)
}
