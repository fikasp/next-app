// components
import ArwPaper from '@/components/shared/containers/ArwPaper'
import ArwTitle from '@/components/shared/common/ArwTitle'
import ItemForm from '@/components/forms/ItemForm'

export default function ItemCreate() {
	return (
		<div className="container grow flex-center p-4">
			<ArwPaper className="gap-8">
				<ArwTitle>Add new item</ArwTitle>
				<ItemForm />
			</ArwPaper>
		</div>
	)
}
