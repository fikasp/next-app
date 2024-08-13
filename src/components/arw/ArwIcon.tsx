// modules
import {
	ArrowDownUp,
	ChevronLeft,
	ChevronRight,
	Ellipsis,
	Home,
	Menu,
	Moon,
	Pencil,
	Search,
	SquarePlus,
	Sun,
	Trash,
	User,
	X,
} from 'lucide-react'
// lib
// components
import { ArwSVG } from '@/components/arw'
import { Icons } from '@/lib/types/enums'

export default function ArwIcon({
	icon,
	className,
	size = 24,
	src,
}: {
	icon?: Icons
	className?: string
	size?: number
	src?: string
}) {
	const iconProps = { className, size }

	if (icon) {
		switch (icon) {
			case Icons.ArrowDownUp:
				return <ArrowDownUp {...iconProps} />
			case Icons.ChevronLeft:
				return <ChevronLeft {...iconProps} />
			case Icons.ChevronRight:
				return <ChevronRight {...iconProps} />
			case Icons.Ellipsis:
				return <Ellipsis {...iconProps} />
			case Icons.Home:
				return <Home {...iconProps} />
			case Icons.Menu:
				return <Menu {...iconProps} />
			case Icons.Moon:
				return <Moon {...iconProps} />
			case Icons.Pencil:
				return <Pencil {...iconProps} />
			case Icons.Search:
				return <Search {...iconProps} />
			case Icons.SquarePlus:
				return <SquarePlus {...iconProps} />
			case Icons.Sun:
				return <Sun {...iconProps} />
			case Icons.Trash:
				return <Trash {...iconProps} />
			case Icons.User:
				return <User {...iconProps} />
			case Icons.X:
				return <X {...iconProps} />
			default:
				return null
		}
	} else if (src) {
		return <ArwSVG src={src} className={className} size={size} />
	} else {
		return null
	}
}
