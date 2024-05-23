// components
import ItemForm from '@/components/forms/ItemForm'
import ArwContainer from '@/components/shared/ArwContainer'
import ArwPaper from '@/components/shared/ArwPaper'
// database
import { getItemBySlug } from '@/database/actions/item.action'
import { IItem } from '@/database/models/item.model'

export default async function ItemUpdatePage({ slug }: { slug: string }) {
	const item: IItem = await getItemBySlug(slug)

	return (
		<ArwContainer className="flex-center sm:grow">
			<ArwPaper className="aspect-square w-full sm:w-[480px]">
				<ItemForm item={item} />
			</ArwPaper>
		</ArwContainer>
	)
}
