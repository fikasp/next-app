// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ProjectForm from '@/components/forms/ProjectForm'
// lib
import { debug } from '@/lib/utils/dev'
import { getCategories } from '@/lib/actions/category.action'
import { ICategory } from '@/lib/models/category.model'
import { Result } from '@/lib/types'

export default async function AddPage() {
	const { data: categories }: Result<ICategory[]> = await getCategories()
	debug(8, 9, categories)
	return (
		<ArwContainer center>
			<ArwPaper className="w-full-4 max-w-md min-h-md border dark:border-none p-8">
				<ProjectForm categories={categories} />
			</ArwPaper>
		</ArwContainer>
	)
}
