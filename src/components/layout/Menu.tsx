'use client'

import Link from 'next/link'
import { ReactSVG } from 'react-svg'
import { usePathname } from 'next/navigation'
import { nav } from '@/navigation'

export default function Menu() {
	const pathname = usePathname()

	return (
		<nav className="flex-center max-md:p-2">
			<ul className="flex max-md:flex-col gap-6">
				{nav.map((link) => {
					const isActive = link.route === pathname
					return (
						<li
							key={link.route}
							className={`${
								isActive && 'text-blue'
							} hover:text-blue transition`}
						>
							<Link className="flex-start" href={link.route}>
								<ReactSVG className="w-[35px] flex-center" src={link.icon} />
								{link.label}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
