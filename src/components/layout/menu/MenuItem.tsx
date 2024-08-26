'use client'
// modules
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// components
import { ArwIcon } from '@/components/arw'
// lib
import { cn } from '@/lib/utils'

export default function MenuItem({
	link,
	setOpen,
	admin,
	adminRoute,
	profileRoute,
	profile,
}: {
	link: any
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	admin?: boolean
	adminRoute?: boolean
	profileRoute?: boolean
	profile?: boolean
}) {
	const pathname = usePathname()
	const isActive = link.route.split('?')[0] === pathname
	const handleClick = () => {
		if (setOpen) {
			console.log('setOpen')

			setOpen(false)
		}
	}
	if (adminRoute && !admin) return null
	if (profileRoute && !profile) return null

	return (
		<li
			className={cn(isActive && 'text-accent', 'hover:text-accent transition')}
			onClick={handleClick}
		>
			<Link
				className="flex items-center justify-center max-md:justify-start max-md:gap-2"
				href={link.route}
			>
				<ArwIcon className="w-[35px] flex-center" icon={link.icon} />
				{link.label}
			</Link>
		</li>
	)
}
