import { routes } from '@/lib/constants/paths'
import { Icons } from '@/lib/types/enums'

export type Nav = {
	route: string
	icon: Icons
	label: string
	labelHide: boolean
	profile: boolean
	admin?: boolean
}

export const navigation: Nav[] = [
	{
		route: routes.HOME,
		icon: Icons.Home,
		label: 'Home',
		labelHide: true,
		profile: false,
	},
	{
		route: routes.ADMIN,
		icon: Icons.Users,
		label: 'Admin',
		labelHide: false,
		profile: false,
		admin: true,
	},
	{
		route: routes.PROFILE,
		icon: Icons.User,
		label: 'My profile',
		labelHide: false,
		profile: true,
	},
	{
		route: routes.ADD,
		icon: Icons.SquarePlus,
		label: 'Add project',
		labelHide: false,
		profile: true,
	},
	{
		route: routes.SEARCH,
		icon: Icons.Search,
		label: 'Search',
		labelHide: false,
		profile: false,
	},
]
