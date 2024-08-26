// modules
import Link from 'next/link'
import { If, Then, Else, When } from 'react-if'
// components
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ArwFlex, ArwLink, ArwPaper, ArwText, ArwTitle } from '@/components/arw'
import ProjectManipulations from '@/components/shared/manipulations/ProjectManipulations'
// lib
import { debug } from '@/lib/utils/dev'
import {
	capitalizeFirstLetter,
	cn,
	generateUrl,
	getBaseRoute,
	transformImageUrl,
} from '@/lib/utils'
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'

export default function ProjectCard({
	project,
	categories,
	searchParams,
	profile,
	admin,
}: {
	project: IProject
	categories: ICategory[]
	searchParams?: any
	profile?: boolean
	admin?: boolean
}) {
	debug(7)
	const route = getBaseRoute(profile, admin)
	const userLink = generateUrl([route], {
		...searchParams,
		user: project.user.username,
	})
	const categoryLink = generateUrl([route], {
		...searchParams,
		category: project.category?.label,
	})

	const coverUrl = project?.cover?.url
		? transformImageUrl(project.cover.url, 'h_400')
		: null

	const coverWhite = coverUrl ? 'text-white' : ''

	return (
		<ArwPaper
			accent
			square
			className="relative justify-between px-5 py-4 group max-lg:aspect-video overflow-hidden"
		>
			<div
				className="absolute inset-0 group-hover:opacity-80 transition"
				style={{
					backgroundImage: coverUrl ? `url(${coverUrl})` : 'none',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			/>
			<Link
				href={generateUrl([route, project.slug], searchParams)}
				className="absolute inset-0 z-20"
			/>
			<ArwFlex row between className="relative items-start">
				<ArwTitle
					className={cn(
						'group-hover:text-accent transition cursor-pointer relative z-10',
						coverWhite
					)}
				>
					{project.title}
				</ArwTitle>
				<When condition={profile || admin}>
					<ProjectManipulations
						project={project}
						categories={categories}
						className={cn('relative z-30', coverWhite)}
					/>
				</When>
			</ArwFlex>
			<ArwFlex row between>
				<If condition={profile}>
					<Then>
						<ArwText className={cn('relative z-10', coverWhite)}>
							{project.info}
						</ArwText>
					</Then>
					<Else>
						<ArwLink href={userLink} className={coverWhite}>
							<ArwFlex row className="items-center gap-2 relative z-30">
								<Avatar>
									<AvatarImage src={project.user.photo} />
								</Avatar>
								<ArwText>
									{capitalizeFirstLetter(project.user.username)}
								</ArwText>
							</ArwFlex>
						</ArwLink>
					</Else>
				</If>
				<ArwLink href={categoryLink} className={coverWhite}>
					<ArwFlex className="relative z-30">
						<ArwText>{capitalizeFirstLetter(project.category?.label)}</ArwText>
					</ArwFlex>
				</ArwLink>
			</ArwFlex>
		</ArwPaper>
	)
}
