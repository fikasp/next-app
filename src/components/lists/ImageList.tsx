'use client'
// modules
import { When } from 'react-if'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
// components
import ArwGrid from '@/components/arw/ArwGrid'
import ImageCard from '@/components/cards/ImageCard'
import ImageDialog from '@/components/dialogs/ImageDialog'
import ImageForm from '@/components/forms/ImageForm'
// lib
import { IProject } from '@/lib/models/project.model'
import { debug } from '@/lib/utils/dev'
import { generateUrl } from '@/lib/utils'
import { routes } from '@/navigation'

export default function ImageList({
	project,
	userMode,
	searchParams,
}: {
	project: IProject
	userMode: boolean
	searchParams: any
}) {

	const router = useRouter()
	// State of the modal
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	// State of the selected image index
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)

	// Function to generate image URL
	const generateImageUrl = useMemo(
		() => (imgIndex: number | undefined) => {
			return generateUrl([routes.PROJECTS, project.slug], {
				...searchParams,
				img: imgIndex,
			})
		},
		[project.slug, searchParams]
	)

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
			router.push(generateImageUrl(selectedImageIndex))
		}
	}, [selectedImageIndex]) // eslint-disable-line react-hooks/exhaustive-deps

	// Handlers for the modal
	const handleOpen = (index: number) => () => {
		debug(2)
		router.push(generateImageUrl(index))
		setSelectedImageIndex(index)
		setIsDialogOpen(true)
	}

	const handlePrev = () => {
		debug(3)
		setSelectedImageIndex((prevIndex) =>
			prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
		)
	}

	const handleNext = () => {
		debug(3)
		setSelectedImageIndex((prevIndex) =>
			prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
		)
	}

	const handleClose = () => {
		debug(4)
		router.push(generateImageUrl(undefined))
		setIsDialogOpen(false)
	}

	return (
		<>
			<ArwGrid className="grow arw-grid-auto-150 content-start gap-3">
				<When condition={project?.images.length !== 0}>
					{project?.images?.map((image, index) => (
						<ImageCard
							key={index}
							index={index}
							image={image}
							project={project}
							userMode={userMode}
							searchParams={searchParams}
							handleOpen={handleOpen(index)}
						/>
					))}
				</When>
				<When condition={userMode}>
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
