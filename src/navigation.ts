import { Icons } from '@/lib/types/enums'
import { routes } from '@/lib/constants/paths'
import { txt } from '@/lib/constants'

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
		label: txt.menu.ADMIN,
		icon: Icons.Users,
		autoHide: false,
		profileOnly: false,
		adminOnly: true,
	},
	{
		route: routes.PROFILE,
		label: txt.menu.PROFILE,
		icon: Icons.User,
		autoHide: false,
		profileOnly: true,
		adminOnly: false,
	},
	{
		route: routes.ADD,
		label: txt.menu.ADD,
		icon: Icons.SquarePlus,
		autoHide: false,
		profileOnly: true,
		adminOnly: false,
	},
	{
		route: routes.KANBAN,
		label: txt.menu.KANBAN,
		icon: Icons.SquareKanban,
		autoHide: false,
		profileOnly: true,
		adminOnly: false,
	},
	{
		route: routes.SEARCH,
		label: txt.menu.SEARCH,
		icon: Icons.Search,
		autoHide: true,
		profileOnly: false,
		adminOnly: false,
	},
]
