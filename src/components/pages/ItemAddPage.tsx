// components
import ArwContainer from '@/components/arw/ArwContainer'
import ArwPaper from '@/components/arw/ArwPaper'
import ItemForm from '@/components/forms/ItemForm'

export default function ItemAddPage() {
	return (
		<ArwContainer center>
			<ArwPaper accent square className="w-full-4 max-w-md">
				<ItemForm />
			</ArwPaper>
		</ArwContainer>
	)
}
