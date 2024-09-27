import { TXT } from '@/lib/types/texts'

export const EN: TXT = {
	common: {
		ADD: 'Add',
		ADDING: 'Adding...',
		PROJECT: 'project',
		UPDATE: 'Update',
		UPDATING: 'Updating...',
	},
	menu: {
		ADD: 'Add project',
		ADMIN: 'Admin',
		KANBAN: 'Kanban',
		PROFILE: 'My profile',
		SEARCH: 'Search',
		SORT_CUSTOM: 'Custom sort',
		SORT_DATE: 'Sort by date',
		SORT_OPTIONS: 'Sort options',
		SORT_TITLE: 'Sort by user',
		SORT_USER: 'Sort by title',
		SORT: 'Sort',
	},
	forms: {
		CATEGORY_PLACEHOLDER: 'Enter a category',
		CATEGORY_LABEL: 'Category',
		INFORMATION_PLACEHOLDER: 'Enter a information',
		INFORMATION_LABEL: 'Information',
		TITLE_PLACEHOLDER: 'Enter a title',
		TITLE_LABEL: 'Title',
	},
	zod: {
		CATEGORY: 'Category is required',
		INFO: 'Information must contain at least 3 characters',
		TITLE: 'Title must contain at least 3 characters',
	},
}
