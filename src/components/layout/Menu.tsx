'use client'
// modules
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { navigation } from '@/navigation'
// components
import Theme from './Theme'
import { ArwIcon } from '@/components/arw'

const MenuItem = ({
	link,
	setOpen,
}: {
	link: any
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const pathname = usePathname()
	const isMobile = useMediaQuery({ maxWidth: 768 })
	const isActive = link.route.split('?')[0] === pathname
	const handleClick = () => {
		if (isMobile) {
			setOpen(false)
		}
	}

	return (
		<li
			className={`${isActive && 'text-accent'} hover:text-accent transition`}
			onClick={handleClick}
		>
			<Link
				className="flex items-center justify-center max-md:justify-start max-md:gap-2"
				href={link.route}
			>
				<ArwIcon className="w-[35px] flex-center" src={link.icon} />
				{link.label}
			</Link>
		</li>
	)
}

export default function Menu({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<nav className="flex-center">
			<ul className="flex max-md:flex-col md:items-center gap-6">
				{navigation.map((link) => {
					return <MenuItem key={link.route} link={link} setOpen={setOpen} />
				})}
				<li className="flex-center">
					<Theme setOpen={setOpen} />
				</li>
			</ul>
		</nav>
	)
}
