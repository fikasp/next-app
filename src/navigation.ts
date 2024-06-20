export const routes = {
	ADD: '/add',
	HOME: '/home',
	PROFILE: '/profile',
	PROJECTS: '/projects',
	SEARCH: '/search',
	START: '/',
}

export const icons = {
	ADD: '/icons/add.svg',
	CANCEL: '/icons/cancel.svg',
	CLOSE: '/icons/close.svg',
	DELETE: '/icons/delete.svg',
	EDIT: '/icons/edit.svg',
	HOME: '/icons/home.svg',
	ITEMS: '/icons/items.svg',
	MENU: '/icons/menu.svg',
	NEXT: '/icons/next.svg',
	PREV: '/icons/prev.svg',
	SAVE: '/icons/save.svg',
	SEARCH: '/icons/search.svg',
	UPLOAD: '/icons/upload.svg',
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
		label: 'My profile',
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
