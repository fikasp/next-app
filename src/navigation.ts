export const routes = {
	HOME: '/',
	ITEMS: '/items',
	ITEMS_CREATE: '/items/create',
	SETTINGS: '/settings',
}

export const nav = [
	{
		route: routes.HOME,
		icon: '/assets/icons/home.svg',
		label: 'Home',
	},
	{
		route: routes.ITEMS,
		icon: '/assets/icons/apps.svg',
		label: 'Items list',
	},
	{
		route: routes.ITEMS_CREATE,
		icon: '/assets/icons/add.svg',
		label: 'Add item',
	},
	{
		route: routes.SETTINGS,
		icon: '/assets/icons/settings.svg',
		label: 'Settings',
	},
]
