'use client'
// modules
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// components
import { ArwIcon, ArwText } from '@/components/arw'
// lib
import { Nav } from '@/navigation'
import { cn } from '@/lib/utils'

export default function NavItem({
	item,
	setOpen,
	profile,
	admin,
}: {
	item: Nav
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>
	profile?: boolean
	admin?: boolean
}) {
	const pathname = usePathname()
	const isActive = item.route.split('?')[0] === pathname
	const handleClick = () => {
		if (setOpen) {
			setOpen(false)
		}
	}
	if (item.adminOnly && !admin) return null
	if (item.profileOnly && !profile) return null

	return (
		<li
			className={cn(isActive && 'text-accent', 'hover:text-accent transition')}
			onClick={handleClick}
		>
			<Link
				className="flex items-center justify-center max-md:justify-start gap-2 md:gap-1"
				href={item.route}
			>
				<ArwIcon className="flex-center" icon={item.icon} />
				<ArwText className={cn(item.autoHide ? 'md:hidden lg:block' : '')}>
					{item.label}
				</ArwText>
			</Link>
		</li>
	)
}
