import { routes } from '@/lib/constants/paths'
import { Icons } from '@/lib/types/enums'

export const navigation = [
	{
		route: routes.HOME,
		icon: Icons.Home,
		label: 'Home',
	},
	{
		route: routes.ADMIN,
		icon: Icons.Users,
		label: 'Admin',
		admin: true,
	},
	{
		route: routes.PROFILE,
		icon: Icons.User,
		label: 'My profile',
		profile: true,
	},
	{
		route: routes.ADD,
		icon: Icons.SquarePlus,
		label: 'Add project',
		profile: true,
	},
	{
		route: routes.SEARCH,
		icon: Icons.Search,
		label: 'Search',
	},
]
