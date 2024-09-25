import { routes } from '@/lib/constants/paths'
import { Icons } from '@/lib/types/enums'

export type Nav = {
	route: string
	icon: Icons
	label: string
	autoHide: boolean
	profileOnly: boolean
	adminOnly: boolean
}

export const navigation: Nav[] = [
	{
		route: routes.ADMIN,
		icon: Icons.Users,
		label: 'Admin',
		autoHide: false,
		profileOnly: false,
		adminOnly: true,
	},
	{
		route: routes.PROFILE,
		icon: Icons.User,
		label: 'My profile',
		autoHide: false,
		profileOnly: true,
		adminOnly: false,
	},
	{
		route: routes.ADD,
		icon: Icons.SquarePlus,
		label: 'Add project',
		autoHide: false,
		profileOnly: true,
		adminOnly: false,
	},
	{
		route: routes.KANBAN,
		icon: Icons.SquareKanban,
		label: 'Kanban',
		autoHide: false,
		profileOnly: true,
		adminOnly: false,
	},
	{
		route: routes.SEARCH,
		icon: Icons.Search,
		label: 'Search',
		autoHide: true,
		profileOnly: false,
		adminOnly: false,
	},
]
