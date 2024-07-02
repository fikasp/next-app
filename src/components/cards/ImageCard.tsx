'use client'
// modules
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { When } from 'react-if'
// components
import { ArwButton, ArwFlex } from '@/components/arw'
// lib
import { handleRemoveImageFromProject } from '@/lib/handlers/project.handlers'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'
import { loadImage } from '@/lib/utils'
import { debug } from '@/lib/utils/dev'
import { icons } from '@/lib/constants/paths'

export default function ImageCard({
	image,
	project,
	profile,
	handleOpen,
}: {
	image: IImage
	project: IProject
	profile: boolean
	handleOpen: MouseEventHandler<HTMLDivElement>
}) {
	debug(8)

	return (
		<ArwFlex
			center
			className="group relative rounded-md h-[130px] bg-transparent border border-base-400 dark:border-base-800 overflow-hidden"
		>
			<div onClick={handleOpen} className="absolute inset-0 z-20" />
			<div className="flex h-full w-full transition duration-300 ease-in-out gap-0 overflow-hidden">
				<Image
					loader={loadImage('w_300,q_30')}
					src={image.url}
					height={300}
					width={300}
					alt={'Image'}
					className="w-full object-cover object-center transition duration-300 ease-in-out group-hover:opacity-80"
					priority
				></Image>
			</div>
			<When condition={profile}>
				<ArwFlex className="absolute top-0 right-0 z-40 p-3">
					<ArwButton
						src={icons.DELETE}
						onClick={() => handleRemoveImageFromProject(project, image)}
						className="hover:text-accent-400 transition"
					/>
				</ArwFlex>
			</When>
		</ArwFlex>
	)
}
