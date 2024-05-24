// components
import ItemForm from '@/components/forms/ItemForm'
import { Dialog, DialogContent } from '@/components/ui/dialog'
// database
import { IItem } from '@/lib/models/item.model'

export default function ItemUpdateDialog({
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
			<DialogContent className="flex flex-col aspect-square w-full-4 max-w-md">
				<ItemForm item={item} close={close} />
			</DialogContent>
		</Dialog>
	)
}
