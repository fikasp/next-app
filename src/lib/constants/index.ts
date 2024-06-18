// lib
import { SortOptions } from '@/lib/types/enums'

export const msg = {
	MIN_LENGTH: (number: number) =>
		`String must contain at least ${number} characters`,
	EMPTY: 'Complete the form field',
	SAVED: 'Changes have been saved',
}

export const sortOptions = [
	{ label: 'Sort projects by title', value: SortOptions.TITLE },
	{ label: 'Sort projects by user', value: SortOptions.USER },
	{ label: 'Sort projects by date', value: SortOptions.DATE },
]

export const categories = [
	{ value: 'common', label: 'Common' },
	{ value: 'mountains', label: 'Mountains' },
	{ value: 'cities', label: 'Cities' },
	{ value: 'other', label: 'Other' },
]
