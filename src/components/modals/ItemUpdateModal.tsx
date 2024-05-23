// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import ItemForm from '@/components/forms/ItemForm'
// database
import { IItem } from '@/database/models/item.model'

export default function ItemUpdateModal({
	item,
	open,
	close,
}: {
	item: IItem
	open: boolean
	close: () => void
}) {
	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="flex flex-col aspect-square sm:w-[480px]">
				<ItemForm item={item} close={close} />
			</DialogContent>
		</Dialog>
	)
}
