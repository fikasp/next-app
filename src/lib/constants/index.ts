// lib
import { SortOptions } from "@/lib/types/enums"

export const msg = {
	MIN_LENGTH: (number: number) =>
		`String must contain at least ${number} characters`,
	EMPTY: 'Complete the form field',
	SAVED: 'Changes have been saved',
}

export const sortOptions = [
	{ label: 'Sort by title', value: SortOptions.TITLE },
	{ label: 'Sort by user', value: SortOptions.USER },
	{ label: 'Sort by date', value: SortOptions.DATE },
]
