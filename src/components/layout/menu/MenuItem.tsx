'use client'
// modules
import clsx from 'clsx'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
// components
import { ArwIconSVG } from '@/components/arw'
// lib
import { useMobile } from '@/lib/utils/hooks'

export default function MenuItem({
	link,
	setOpen,
	publicRoute,
}: {
	link: any
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	publicRoute: boolean
}) {
	const pathname = usePathname()
	const isMobile = useMobile()
	const isActive = link.route.split('?')[0] === pathname
	const { isSignedIn } = useAuth()
	const handleClick = () => {
		if (isMobile && setOpen) {
			setOpen(false)
		}
	}
	if (!publicRoute && !isSignedIn) return null

	return (
		<li
			className={clsx(
				isActive && 'text-accent',
				'hover:text-accent transition'
			)}
			onClick={handleClick}
		>
			<Link
				className="flex items-center justify-center max-md:justify-start max-md:gap-2"
				href={link.route}
			>
				<ArwIconSVG className="w-[35px] flex-center" src={link.icon} />
				{link.label}
			</Link>
		</li>
	)
}
