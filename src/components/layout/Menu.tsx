'use client'
// modules
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { nav } from '@/navigation'
// components
import ArwIcon from '@/components/shared/common/ArwIcon'
import Theme from './Theme'

const MenuItem = ({
	link,
	setOpen,
}: {
	link: any
	setOpen: (open: boolean) => void
}) => {
	const pathname = usePathname()
	const isMobile = useMediaQuery({ maxWidth: 768 })
	const isActive = link.route === pathname
	const handleClick = () => {
		if (isMobile) {
			setOpen(false)
		}
	}

	return (
		<li
			className={`${isActive && 'arw-text-accent'} arw-text-hover`}
			onClick={handleClick}
		>
			<Link className="flex-start" href={link.route}>
				<ArwIcon className="w-[35px] flex-center" src={link.icon} />
				{link.label}
			</Link>
		</li>
	)
}

export default function Menu({
	setOpen,
}: {
	setOpen: (open: boolean) => void
}) {
	return (
		<nav className="flex-center">
			<ul className="flex max-md:flex-col md:items-center gap-6">
				{nav.map((link) => {
					return <MenuItem key={link.route} link={link} setOpen={setOpen} />
				})}
				<li className="flex-center">
					<Theme setOpen={setOpen} />
				</li>
			</ul>
		</nav>
	)
}
