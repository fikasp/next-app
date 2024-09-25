import { routes } from '@/lib/constants/paths'
import { Icons } from '@/lib/types/enums'

export type Nav = {
	route: string
	icon: Icons
	label: string
	autoHide: boolean
	profile: boolean
	admin?: boolean
}

export const navigation: Nav[] = [
	{
		route: routes.HOME,
		icon: Icons.Home,
		label: 'Home',
		autoHide: true,
		profile: false,
	},
	{
		route: routes.ADMIN,
		icon: Icons.Users,
		label: 'Admin',
		autoHide: false,
		profile: false,
		admin: true,
	},
	{
		route: routes.PROFILE,
		icon: Icons.User,
		label: 'My profile',
		autoHide: false,
		profile: true,
	},
	{
		route: routes.ADD,
		icon: Icons.SquarePlus,
		label: 'Add project',
		autoHide: false,
		profile: true,
	},
	{
		route: routes.KANBAN,
		icon: Icons.SquareKanban,
		label: 'Kanban',
		autoHide: false,
		profile: true,
	},
	{
		route: routes.SEARCH,
		icon: Icons.Search,
		label: 'Search',
		autoHide: true,
		profile: false,
	},
]
