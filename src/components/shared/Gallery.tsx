'use client'
// modules
import { When } from 'react-if'
import { useState } from 'react'
// components
import ArwGrid from '@/components/arw/ArwGrid'
import ImageCard from '@/components/cards/ImageCard'
import ImageDialog from '@/components/dialogs/ImageDialog'
import ImageForm from '@/components/forms/ImageForm'
// lib
import { IProject } from '@/lib/models/project.model'

export default function Gallery({
	project,
	userMode,
	searchParams,
}: {
	project: IProject
	userMode: boolean
	searchParams: any
}) {
	// State of the modal
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	// State of the selected image index
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)

	// Handle image click
	const handleOpen = (index: number) => {
		setSelectedImageIndex(index)
		setIsDialogOpen(true)
	}

	const handleClose = () => {
		setIsDialogOpen(false)
	}

	const handlePrevClick = () => {
		setSelectedImageIndex((prevIndex) =>
			prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
		)
	}

	const handleNextClick = () => {
		setSelectedImageIndex((prevIndex) =>
			prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
		)
	}

	return (
		<>
			<ArwGrid className="grow arw-grid-auto-150 content-start gap-3">
				<When condition={project?.images.length !== 0}>
					{project?.images?.map((image, index) => (
						<div key={index} onClick={() => handleOpen(index)}>
							<ImageCard
								key={index}
                index={index}
								image={image}
								project={project}
								userMode={userMode}
								searchParams={searchParams}
							/>
						</div>
					))}
				</When>
				<When condition={userMode}>
					<ImageForm project={project} />
				</When>
			</ArwGrid>
			<ImageDialog
				isOpen={isDialogOpen}
				images={project.images}
				selectedIndex={selectedImageIndex}
				handleClose={handleClose}
				handleNextClick={handleNextClick}
				handlePrevClick={handlePrevClick}
			/>
		</>
	)
}
