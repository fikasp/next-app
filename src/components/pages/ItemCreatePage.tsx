// components
import ArwContainer from '@/components/shared/ArwContainer'
import ArwPaper from '@/components/shared/ArwPaper'
import ItemForm from '@/components/forms/ItemForm'

export default function ItemCreatePage() {
	return (
		<ArwContainer className="flex-center sm:grow">
			<ArwPaper className="aspect-square w-full sm:w-[480px]">
				<ItemForm />
			</ArwPaper>
		</ArwContainer>
	)
}
