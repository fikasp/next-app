'use client'
// modules
import { When } from 'react-if'
import { useEffect, useState } from 'react'
// components
import { ArwGrid } from '@/components/arw'
import ImageCard from '@/components/cards/ImageCard'
import ImageDialog from '@/components/dialogs/ImageDialog'
import ImageForm from '@/components/forms/ImageForm'
// lib
import { IProject } from '@/lib/models/project.model'
import { updateUrlParams } from '@/lib/utils'
import { debug } from '@/lib/utils/dev'

export default function ImageList({
	project,
	profile,
	searchParams,
}: {
	project: IProject
	profile: boolean
	searchParams: any
}) {
	debug(7)
	// State of the modal
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	// State of the selected image index
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)

	// Initialize state
	useEffect(() => {
		if (searchParams.img) {
			const index = parseInt(searchParams.img)
			if (!isNaN(index) && index >= 0 && index < project.images.length) {
				setSelectedImageIndex(index)
				setIsDialogOpen(true)
			}
		}
	}, [searchParams, project.images.length])

	// Update URL
	useEffect(() => {
		if (isDialogOpen) {
			updateUrlParams({ img: String(selectedImageIndex) })
		}
	}, [selectedImageIndex, isDialogOpen])

	// Handlers for the modal
	const handleOpen = (index: number) => {
		debug(2)
		updateUrlParams({ img: String(index) })
		setSelectedImageIndex(index)
		setIsDialogOpen(true)
	}

	const handlePrev = () => {
		debug(4)
		setSelectedImageIndex((prevIndex) =>
			prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
		)
	}

	const handleNext = () => {
		debug(4)
		setSelectedImageIndex((prevIndex) =>
			prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
		)
	}

	const handleClose = () => {
		debug(5)
		updateUrlParams({ img: null })
		setIsDialogOpen(false)
	}

	return (
		<>
			<ArwGrid className="grow arw-grid-auto-130 content-start gap-3">
				<When condition={project?.images.length !== 0}>
					{project?.images?.map((image, index) => (
						<ImageCard
							key={image._id}
							image={image}
							project={project}
							profile={profile}
							handleOpen={() => handleOpen(index)}
						/>
					))}
				</When>
				<When condition={profile}>
					<ImageForm project={project} />
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
