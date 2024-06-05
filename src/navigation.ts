export const routes = {
	ADD: '/add',
	HOME: '/home',
	PROFILE: '/projects?user=current',
	PROJECTS: '/projects',
	SEARCH: '/search',
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
}

export const nav = [
	{
		route: routes.START,
		icon: icons.HOME,
		label: 'Home',
	},
	{
		route: routes.PROFILE,
		icon: icons.ITEMS,
		label: 'My projects',
	},
	{
		route: routes.ADD,
		icon: icons.ADD,
		label: 'Add project',
	},
	{
		route: routes.SEARCH,
		icon: icons.SEARCH,
		label: 'Search',
	},
]
