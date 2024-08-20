import { routes } from '@/lib/constants/paths'
import { Icons } from '@/lib/types/enums'

export const navigation = [
	{
		route: routes.HOME,
		icon: Icons.Home,
		label: 'Home',
		public: true,
	},
	{
		route: routes.PROFILE,
		icon: Icons.User,
		label: 'My profile',
		public: false,
	},
	{
		route: routes.ADD,
		icon: Icons.SquarePlus,
		label: 'Add project',
		public: false,
	},
	{
		route: routes.SEARCH,
		icon: Icons.Search,
		label: 'Search',
		public: true,
	},
]
