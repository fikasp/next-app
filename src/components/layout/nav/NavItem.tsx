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
	if (item.admin && !admin) return null
	if (item.profile && !profile) return null

	return (
		<li
			className={cn(isActive && 'text-accent', 'hover:text-accent transition')}
			onClick={handleClick}
		>
			<Link
				className="flex items-center justify-center max-md:justify-start max-md:gap-2"
				href={item.route}
			>
				<ArwIcon className="w-[35px] flex-center" icon={item.icon} />
				<ArwText className={cn(item.labelHide ? 'md:hidden lg:block' : '')}>
					{item.label}
				</ArwText>
			</Link>
		</li>
	)
}
