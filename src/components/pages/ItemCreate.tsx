// components
import ArwContainer from '@/components/shared/containers/ArwContainer'
import ArwPaper from '@/components/shared/containers/ArwPaper'
import ArwTitle from '@/components/shared/common/ArwTitle'
import ItemForm from '@/components/forms/ItemForm'

export default function ItemCreate() {
	return (
		<ArwContainer className="grow flex-center p-4">
			<ArwPaper className="w-[320px] gap-8">
				<ArwTitle>Add new item</ArwTitle>
				<ItemForm />
			</ArwPaper>
		</ArwContainer>
	)
}
