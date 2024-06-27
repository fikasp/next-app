// components
import ArwPaper from '@/components/arw/ArwPaper'
import ArwContainer from '@/components/arw/ArwContainer'
import SearchForm from '@/components/forms/SearchForm'
// lib
import { debug } from '@/lib/utils/dev'
import { getCategories } from '@/lib/actions/category.action'
import { ICategory } from '@/lib/models/category.model'
import { Result } from '@/lib/types/results'

export default async function SearchPage() {
	debug(7)
	const { data: categories }: Result<ICategory[]> = await getCategories()
	return (
		<ArwContainer center>
			<ArwPaper className="w-full-4 max-w-md min-h-md border dark:border-none p-8">
				<SearchForm categories={categories} />
			</ArwPaper>
		</ArwContainer>
	)
}
