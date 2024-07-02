// components
import { ArwPaper, ArwContainer } from '@/components/arw'
import SearchForm from '@/components/forms/SearchForm'
// lib
import { DataResult } from '@/lib/types/results'
import { getCategories } from '@/lib/actions/category.actions'
import { ICategory } from '@/lib/models/category.model'
import { debug } from '@/lib/utils/dev'

export default async function SearchPage() {
	debug(6)
	const { data: categories }: DataResult<ICategory[]> = await getCategories()
	return (
		<ArwContainer center>
			<ArwPaper className="w-full-4 max-w-md min-h-md border dark:border-none p-8">
				<SearchForm categories={categories} />
			</ArwPaper>
		</ArwContainer>
	)
}
