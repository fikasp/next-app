// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ProjectForm from '@/components/forms/ProjectForm'
// lib
import { debug } from '@/lib/utils/dev'
import { getCategories } from '@/lib/actions/category.action'
import { ICategory } from '@/lib/models/category.model'
import { DataResult } from '@/lib/types/results'

export default async function AddPage() {
	debug(7)
	const { data: categories }: DataResult<ICategory[]> = await getCategories()
	return (
		<ArwContainer center>
			<ArwPaper className="w-full-4 max-w-md min-h-md border dark:border-none p-8">
				<ProjectForm categories={categories} />
			</ArwPaper>
		</ArwContainer>
	)
}
