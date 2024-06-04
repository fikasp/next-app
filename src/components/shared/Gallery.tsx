'use client'
// modules
import { When } from 'react-if'
// components
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ImageCard from '@/components/cards/ImageCard'
// lib
import { addImageToItem, removeImageFromItem } from '@/lib/actions/item.action'
import { checkUserMode, handleError } from '@/lib/utils'
import { IItem } from '@/lib/models/item.model'
import { IUser } from '@/lib/models/user.model'

export default function Gallery({
	searchParams,
	currentUser,
	item,
}: {
	searchParams: any
	currentUser: IUser
	item: IItem
}) {
	const { toast } = useToast()

	const userMode =
		checkUserMode(searchParams) && item.user.toString() === currentUser._id

	const handleAddImage = async () => {
		try {
			if (item) {
				const updatedItem = await addImageToItem(
					item.slug,
					'https://image.com',
					'placeholder'
				)
				if (updatedItem) {
					toast({
						title: 'Image added!',
						description: 'New image is successfully added',
					})
				}
			}
		} catch (error) {
			handleError(error)
		}
	}

	const handleRemoveImage = (imageId: string) => async () => {
		try {
			const updatedItem = await removeImageFromItem(item.slug, imageId)
			if (updatedItem) {
				toast({
					title: 'Image removed!',
					description: 'The image has been successfully removed',
				})
			}
		} catch (error) {
			handleError(error)
		}
	}

	return (
		<div className="grow grid arw-grid-auto-150 w-full content-start gap-3">
			<When condition={item?.images.length !== 0}>
				{item?.images?.map((image, index) => (
					<ImageCard
						key={index}
						index={index}
						image={image}
						handleRemove={handleRemoveImage}
						searchParams={searchParams}
						userMode={userMode}
						slug={item.slug}
					/>
				))}
			</When>
			<When condition={userMode}>
				<Button
					variant="outline"
					onClick={handleAddImage}
					className="h-[150px] w-full"
				>
					Add item
				</Button>
			</When>
		</div>
	)
}
