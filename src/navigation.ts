export const routes = {
	ADD: '/add',
	HOME: '/home',
	PROFILE: '/projects?user=current',
	PROJECTS: '/projects',
	SEARCH: '/search',
	START: '/',
}

export const icons = {
	ADD: '/icons/add.svg',
	BACK: '/icons/back.svg',
	CLOSE: '/icons/close.svg',
	DELETE: '/icons/delete.svg',
	EDIT: '/icons/edit.svg',
	HOME: '/icons/home.svg',
	UPLOAD: '/icons/upload.svg',
	ITEMS: '/icons/items.svg',
	MENU: '/icons/menu.svg',
	NEXT: '/icons/next.svg',
	SEARCH: '/icons/search.svg',
}

export const images = {
	IMAGE: '/images/image.png',
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
