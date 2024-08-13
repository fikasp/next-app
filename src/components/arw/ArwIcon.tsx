// modules
import {
	ArrowDownUp,
	Menu,
	Moon,
	Search,
	SquarePlus,
	Sun,
	User,
} from 'lucide-react'
// lib
import { Icons } from '@/lib/types/enums'

export default function ArwIcon({
	icon,
	className,
	size = 24,
}: {
	icon: Icons
	className?: string
	size?: number
}) {
	const iconProps = { className, size }

	switch (icon) {
		case Icons.ArrowDownUp:
			return <ArrowDownUp {...iconProps} />
		case Icons.Menu:
			return <Menu {...iconProps} />
		case Icons.Moon:
			return <Moon {...iconProps} />
		case Icons.Search:
			return <Search {...iconProps} />
		case Icons.SquarePlus:
			return <SquarePlus {...iconProps} />
		case Icons.Sun:
			return <Sun {...iconProps} />
		case Icons.User:
			return <User {...iconProps} />
		default:
			return null
	}
}
