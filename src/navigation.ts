export const routes = {
	ADD: '/add',
	HOME: '/home',
	ITEMS: '/items',
	SEARCH: '/search',
	SETTINGS: '/settings',
	MYITEMS: '/items?user=current',
	START: '/',
}

export const icons = {
	ADD: '/assets/icons/add.svg',
	BACK: '/assets/icons/back.svg',
	CLOSE: '/assets/icons/close.svg',
	DELETE: '/assets/icons/delete.svg',
	EDIT: '/assets/icons/edit.svg',
	HOME: '/assets/icons/home.svg',
	ITEMS: '/assets/icons/items.svg',
	MENU: '/assets/icons/menu.svg',
	NEXT: '/assets/icons/next.svg',
	SEARCH: '/assets/icons/search.svg',
	SETTINGS: '/assets/icons/settings.svg',
}

export const nav = [
	{
		route: routes.START,
		icon: icons.HOME,
		label: 'Home',
	},
	{
		route: routes.MYITEMS,
		icon: icons.ITEMS,
		label: 'My items',
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
	{
		route: routes.SEARCH,
		icon: icons.SEARCH,
		label: 'Search',
	},
]
