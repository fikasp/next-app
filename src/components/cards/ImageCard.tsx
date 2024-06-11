'use client'
// modules
import { MouseEventHandler } from 'react'
import { When } from 'react-if'
import Image from 'next/image'
// components
import ArwButton from '@/components/arw/ArwButton'
import ArwFlex from '@/components/arw/ArwFlex'
// lib
import { generateUrl } from '@/lib/utils'
import { handleRemoveImage } from '@/lib/handlers/project.handlers'
import { icons, routes } from '@/navigation'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'

export default function ImageCard({
	image,
	index,
	project,
	userMode,
	searchParams,
	handleOpen,
}: {
	image: IImage
	index: number
	project: IProject
	userMode: boolean
	searchParams: any
	handleOpen: MouseEventHandler<HTMLDivElement>
}) {
	// Generate URL
	const url = generateUrl([routes.PROJECTS, project.slug], {
		...searchParams,
		img: index,
	})

	return (
		<ArwFlex
			center
			className="group relative rounded-md h-[150px] bg-transparent border border-base-400 dark:border-base-800 overflow-hidden"
		>
			<div onClick={handleOpen} className="absolute inset-0 z-20" />
			<div className="flex h-full w-full transition duration-300 ease-in-out gap-0 overflow-hidden">
				<Image
					src={image.url}
					height={300}
					width={300}
					alt={'Image'}
					loading={'eager'}
					priority={true}
					className="w-full object-cover object-center transition duration-300 ease-in-out group-hover:opacity-80"
				></Image>
			</div>
			<When condition={userMode}>
				<ArwFlex className="absolute top-0 right-0 z-40 p-3">
					<ArwButton
						src={icons.DELETE}
						onClick={handleRemoveImage(project, image)}
						className="hover:text-accent-400 transition"
					/>
				</ArwFlex>
			</When>
		</ArwFlex>
	)
}
