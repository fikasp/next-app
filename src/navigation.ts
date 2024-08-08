import { icons } from '@/lib/constants/paths'
import { routes } from '@/lib/constants/paths'

export const navigation = [
	{
		route: routes.HOME,
		icon: icons.HOME,
		label: 'Home',
		public: true
	},
	{
		route: routes.PROFILE,
		icon: icons.PROFILE,
		label: 'My profile',
		public: false
	},
	{
		route: routes.ADD,
		icon: icons.ADD,
		label: 'Add project',
		public: false
	},
	{
		route: routes.SEARCH,
		icon: icons.SEARCH,
		label: 'Search',
		public: true
	},
]
