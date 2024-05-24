export const routes = {
	ADD: '/add',
	HOME: '/home',
	ITEMS: '/items',
	SETTINGS: '/settings',
	START: '/',
}

export const icons = {
	ADD: '/assets/icons/add.svg',
	DELETE: '/assets/icons/delete.svg',
	EDIT: '/assets/icons/edit.svg',
	HOME: '/assets/icons/home.svg',
	ITEMS: '/assets/icons/items.svg',
	MENU: '/assets/icons/menu.svg',
	SETTINGS: '/assets/icons/settings.svg',
}

export const nav = [
	{
		route: routes.HOME,
		icon: icons.HOME,
		label: 'Home',
	},
	{
		route: routes.ITEMS,
		icon: icons.ITEMS,
		label: 'Items list',
	},
	{
		route: routes.ADD,
		icon: icons.ADD,
		label: 'Add item',
	},
	{
		route: routes.SETTINGS,
		icon: icons.SETTINGS,
		label: 'Settings',
	},
]
