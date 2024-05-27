// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ItemForm from '@/components/forms/ItemForm'

export default function ItemAddPage() {
	return (
		<ArwContainer center>
			<ArwPaper square className="w-full-4 max-w-md border dark:border-none p-8">
				<ItemForm />
			</ArwPaper>
		</ArwContainer>
	)
}
