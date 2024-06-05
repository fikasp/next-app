'use client'
// modules
import { When } from 'react-if'
// components
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ItemCard from '@/components/cards/ItemCard'
// lib
import {
	addItemToProject,
	removeItemFromProject,
} from '@/lib/actions/project.action'
import { checkUserMode, handleError } from '@/lib/utils'
import { IProject } from '@/lib/models/project.model'
import { IUser } from '@/lib/models/user.model'

export default function Items({
	searchParams,
	currentUser,
	project,
}: {
	searchParams: any
	currentUser: IUser
	project: IProject
}) {
	const { toast } = useToast()

	const userMode =
		checkUserMode(searchParams) && project.user.toString() === currentUser._id

	const handleAddItem = async () => {
		try {
			if (project) {
				const updatedItem = await addItemToProject(project.slug)
				if (updatedItem) {
					toast({
						title: 'Item added!',
						description: 'New item is successfully added',
					})
				}
			}
		} catch (error) {
			handleError(error)
		}
	}

	const handleRemoveItem = (itemId: string) => async () => {
		try {
			const updatedItem = await removeItemFromProject(project.slug, itemId)
			if (updatedItem) {
				toast({
					title: 'Item removed!',
					description: 'The item has been successfully removed',
				})
			}
		} catch (error) {
			handleError(error)
		}
	}

	return (
		<div className="grow grid arw-grid-auto-150 w-full content-start gap-3">
			<When condition={project?.items.length !== 0}>
				{project?.items?.map((item, index) => (
					<ItemCard
						key={index}
						index={index}
						item={item}
						handleRemove={handleRemoveItem}
						searchParams={searchParams}
						userMode={userMode}
						slug={project.slug}
					/>
				))}
			</When>
			<When condition={userMode}>
				<Button
					variant="outline"
					onClick={handleAddItem}
					className="h-[150px] w-full"
				>
					Add item
				</Button>
			</When>
		</div>
	)
}
