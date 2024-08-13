'use client'
// modules
import { When } from 'react-if'
import { useEffect, useMemo, useState } from 'react'
// components
import { ArwGrid } from '@/components/arw'
import ImageCard from '@/components/lists/items/ImageCard'
import ImageDialog from '@/components/dialogs/ImageDialog'
import ImageForm from '@/components/forms/ImageForm'
// lib
import { debug } from '@/lib/utils/dev'
import { generateUrl, updateUrlPath } from '@/lib/utils'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/lib/constants/paths'

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

	const route = profile ? routes.PROFILE : routes.PROJECTS

	// Initialize state
	useEffect(() => {
		if (params.img) {
			const index = parseInt(params.img)
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

	// Memoized image cards
	const imageCards = useMemo(() => {
		return project?.images?.map((image, index) => (
			<ImageCard
				key={image._id}
				image={image}
				project={project}
				profile={profile}
				handleOpen={() => handleOpen(index + 1)}
			/>
		))
	}, [project, profile])

	return (
		<>
			<ArwGrid className="arw-grid-auto-130 content-start gap-1">
				<When condition={profile}>
					<ImageForm project={project} />
				</When>
				<When condition={project?.images.length > 0}>{imageCards}</When>
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
