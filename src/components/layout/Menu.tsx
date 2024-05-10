'use client'
// modules
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { nav } from '@/navigation'
// components
import Icon from '@/components/shared/common/ArwIcon'

export default function Menu({
	setOpen,
}: {
	setOpen: (open: boolean) => void
}) {
	const pathname = usePathname()

	return (
		<nav className="flex-center">
			<ul className="flex max-md:flex-col gap-6">
				{nav.map((link) => {
					const isActive = link.route === pathname
					return (
						<li
							key={link.route}
							className={`${isActive && 'text-blue'} hover-blue`}
							onClick={() => setOpen(false)}
						>
							<Link className="flex-start" href={link.route}>
								<Icon className="w-[35px] flex-center" src={link.icon} />
								{link.label}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
