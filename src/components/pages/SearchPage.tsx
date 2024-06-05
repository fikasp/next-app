// components
import ArwPaper from '@/components/arw/ArwPaper'
import ArwContainer from '@/components/arw/ArwContainer'
import SearchForm from '@/components/forms/SearchForm'

export default function SearchPage() {
	return (
		<ArwContainer center>
			<ArwPaper square className="w-full-4 max-w-md border dark:border-none p-8">
				<SearchForm />
			</ArwPaper>
		</ArwContainer>
	)
}
