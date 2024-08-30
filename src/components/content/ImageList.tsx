'use client'
// modules
import { When } from 'react-if'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
// components
import { ArwGrid } from '@/components/arw'
import ImageCard from '@/components/content/cards/ImageCard'
import ImageDialog from '@/components/dialogs/ImageDialog'
import ImageForm from '@/components/forms/ImageForm'
import SortableItem from '@/components/shared/SortableItem'
// lib
import { debug } from '@/lib/utils/dev'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { generateUrl, updateUrlPath } from '@/lib/utils'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/lib/constants/paths'
import { toastSuccess } from '@/lib/utils/toasts'
import { updateImageOrder } from '@/lib/actions/project.actions'
import { useDndSensors, useKeys, useScrollToTop } from '@/lib/utils/hooks'

export default function ImageList({
	project,
	profile,
	params,
}: {
	project: IProject
	profile: boolean
	params: any
}) {
	debug(8)
	// State of the modal
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	// State of the selected image index
	const [selectedImageIndex, setSelectedImageIndex] = useState(1)
	// State of the image being edited
	const [editingImage, setEditingImage] = useState<IImage | null>(null)
	// State of the images
	const [images, setImages] = useState<IImage[]>(project.images)

	useEffect(() => {
		setImages(project.images)
	}, [project.images])

	const route = profile ? routes.PROFILE : routes.PROJECTS

	useScrollToTop()
	useKeys({ ArrowDown: () => handleOpen(selectedImageIndex) }, !isDialogOpen)

	// Initialize state
	useEffect(() => {
		if (params.slug[1]) {
			const index = parseInt(params.slug[1])
			if (!isNaN(index) && index >= 1 && index <= project.images.length) {
				setSelectedImageIndex(index)
				setIsDialogOpen(true)
			}
		}
	}, [params, project.images.length])

	// Update URL
	useEffect(() => {
		if (isDialogOpen) {
			const path = generateUrl([
				route,
				project.slug,
				String(selectedImageIndex),
			])
			updateUrlPath(path)
		}
	}, [selectedImageIndex, isDialogOpen, project.slug, route])

	// Handlers for the modal
	const handleOpen = (index: number) => {
		debug(2)
		setSelectedImageIndex(index)
		setIsDialogOpen(true)
	}

	const handlePrev = () => {
		debug(4)
		setSelectedImageIndex((prevIndex) =>
			prevIndex === 1 ? project.images.length : prevIndex - 1
		)
	}

	const handleNext = () => {
		debug(4)
		setSelectedImageIndex((prevIndex) =>
			prevIndex === project.images.length ? 1 : prevIndex + 1
		)
	}

	const handleClose = () => {
		debug(5)
		const path = generateUrl([route, project.slug])
		updateUrlPath(path)
		setIsDialogOpen(false)
	}

	// Handler for editing an image
	const handleEditOpen = (image: IImage) => {
		setEditingImage(image)
	}

	// Hander for canceling editing
	const handleEditClose = () => {
		setEditingImage(null)
	}

	const handleImageUpdate = useCallback(
		(updatedImage: IImage) => {
			const updatedImages = images.map((img) =>
				img._id === updatedImage._id ? updatedImage : img
			)
			setImages(updatedImages)
			setEditingImage(null)
		},
		[images, setImages, setEditingImage]
	)

	// Memoized image cards
	const imageCards = useMemo(() => {
		return images.map((image, index) =>
			editingImage?._id === image._id ? (
				<ImageForm
					key={image._id}
					image={image}
					project={project}
					handleUpdate={handleImageUpdate}
					handleClose={handleEditClose}
				/>
			) : profile ? (
				<SortableItem
					key={image._id}
					id={image._id}
					className="bottom-0 left-0 drop-shadow text-white"
				>
					<ImageCard
						key={image._id}
						image={image}
						project={project}
						profile={profile}
						handleOpen={() => handleOpen(index + 1)}
						handleEdit={handleEditOpen}
					/>
				</SortableItem>
			) : (
				<ImageCard
					key={image._id}
					image={image}
					project={project}
					profile={profile}
					handleOpen={() => handleOpen(index + 1)}
					handleEdit={handleEditOpen}
				/>
			)
		)
	}, [images, project, profile, editingImage, handleImageUpdate])

	const handleDragEnd = async (event: any) => {
		const { active, over } = event

		if (active.id !== over.id) {
			const oldIndex = images.findIndex((image) => image._id === active.id)
			const newIndex = images.findIndex((image) => image._id === over.id)

			const reorderedImages = arrayMove(images, oldIndex, newIndex)
			setImages(reorderedImages)

			const { success } = await updateImageOrder(project.slug, reorderedImages)
			if (success) {
				toastSuccess('Images successfully reordered.')
			}
		}
	}

	return (
		<>
			<ArwGrid className="arw-grid-auto-150 sm:arw-grid-auto-200 content-start gap-1">
				<When condition={profile}>
					<ImageForm project={project} />
				</When>
				<When condition={project?.images.length > 0}>
					<DndContext
						sensors={useDndSensors()}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext items={images.map((image) => image._id)}>
							{imageCards}
						</SortableContext>
					</DndContext>
				</When>
			</ArwGrid>
			<ImageDialog
				isOpen={isDialogOpen}
				selectedIndex={selectedImageIndex}
				images={project.images}
				handleClose={handleClose}
				handleNext={handleNext}
				handlePrev={handlePrev}
			/>
		</>
	)
}
