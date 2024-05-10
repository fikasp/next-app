// components
import ArwContainer from '@/components/shared/containers/ArwContainer'
import ArwPaper from '@/components/shared/containers/ArwPaper'
import ItemForm from '@/components/forms/ItemForm'

export default function ItemCreate() {
	return (
		<ArwContainer className="flex-center p-4 sm:grow">
			<ArwPaper className="aspect-square w-full sm:w-[480px]">
				<ItemForm />
			</ArwPaper>
		</ArwContainer>
	)
}
