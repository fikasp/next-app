'use client'
// modules
import { When } from 'react-if'
// components
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ImageCard from '@/components/cards/ImageCard'
import ImageForm from '@/components/forms/ImageForm'
// lib
import {
	addImageToProject,
	removeImageFromProject,
} from '@/lib/actions/project.action'
import { checkUserMode } from '@/lib/utils'
import { handleError } from '@/lib/utils/dev'
import { IProject } from '@/lib/models/project.model'
import { IUser } from '@/lib/models/user.model'

export default function Gallery({
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

	const handleAddImage = async (url: string) => {
		try {
			if (project) {
				const updatedProject = await addImageToProject(project.slug, url)
				if (updatedProject) {
					toast({
						title: 'Image uploaded!',
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
			const updatedProject = await removeImageFromProject(project.slug, imageId)
			if (updatedProject) {
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
			<When condition={project?.images.length !== 0}>
				{project?.images?.map((image, index) => (
					<ImageCard
						key={index}
						index={index}
						image={image}
						handleRemove={handleRemoveImage}
						searchParams={searchParams}
						userMode={userMode}
						slug={project.slug}
					/>
				))}
			</When>
			<When condition={userMode}>
				{/* <Button
					variant="outline"
					onClick={handleAddImage}
					className="h-[150px] w-full"
				>
					Add image
				</Button> */}
				<ImageForm handleAddImage={handleAddImage} />
			</When>
		</div>
	)
}
