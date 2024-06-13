// modules
import Link from 'next/link'
import { If, Then, Else, When } from 'react-if'
// components
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwLink from '@/components/arw/ArwLink'
import ArwPaper from '@/components/arw/ArwPaper'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
import Manipulations from '@/components/shared/Manipulations'
// lib
import { checkUserMode, generateUrl } from '@/lib/utils'
import { IProject } from '@/lib/models/project.model'
import { routes } from '@/navigation'

export default function ProjectCard({
	project,
	searchParams,
	userMode,
}: {
	project: IProject
	searchParams?: any
	userMode?: boolean
}) {
	const queryParams = { ...searchParams, user: project.user.username }

	return (
		<ArwPaper
			accent
			square
			className="relative justify-between px-5 py-4 group max-lg:aspect-video"
		>
			<Link
				href={generateUrl(
					[userMode ? routes.PROFILE : routes.PROJECTS, project.slug],
					searchParams
				)}
				className="absolute inset-0 z-20"
			/>
			<ArwFlex row between className="relative">
				<ArwTitle className="group-hover:text-accent transition cursor-pointer relative z-10">
					{project.title}
				</ArwTitle>
				<When condition={userMode}>
					<Manipulations project={project} className="relative z-30" />
				</When>
			</ArwFlex>
			<If condition={userMode}>
				<Then>
					<ArwText className="relative z-10">{project.info}</ArwText>
				</Then>
				<Else>
					<ArwLink href={generateUrl([routes.PROJECTS], queryParams)}>
						<ArwFlex row className="items-center gap-2 relative z-30">
							<Avatar>
								<AvatarImage src={project.user.photo} />
							</Avatar>
							<ArwText>{project.user.username}</ArwText>
						</ArwFlex>
					</ArwLink>
				</Else>
			</If>
		</ArwPaper>
	)
}
