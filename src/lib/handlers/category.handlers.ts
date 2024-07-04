import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/lib/actions/category.actions'
import { ICategory } from '@/lib/models/category.model'
import { Option } from '@/lib/types/shared'
import { Result } from '@/lib/types/results'
import { toastError, toastSuccess } from '@/lib/utils/toasts'
import { debug, handleError } from '@/lib/utils/dev'

// CREATE
export const handleCreateCategory = async (
	e: any,
	newLabel: string,
	setNewLabel: React.Dispatch<string>
) => {
	e.stopPropagation()
	e.preventDefault()
	try {
		debug(2)
		const { error, success }: Result<ICategory> = await createCategory(
			newLabel
		)
		if (error) {
			toastError(Object.values(error))
		} else if (success) {
			toastSuccess('Category added.')
			setNewLabel('')
		}
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
export const handleUpdateCategory = async (
	editedLabel: string,
	editedOption: Option | null
) => {
	if (editedOption) {
		debug(4)
		try {
			const { error, success }: Result<ICategory> = await updateCategory(
				editedOption.label,
				editedLabel
			)
			if (error) {
				toastError(Object.values(error))
			} else if (success) {
				toastSuccess('Category updated.')
			}
		} catch (error) {
			handleError(error)
		}
	}
}

// DELETE
export const handleDeleteCategory = async (option: Option) => {
	try {
		debug(5)
		const { error, success }: Result<ICategory> = await deleteCategory(
			option.label
		)
		if (error) {
			toastError(Object.values(error))
		} else if (success) {
			toastSuccess('Category deleted.')
		}
	} catch (error) {
		handleError(error)
	}
}
