import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/lib/actions/category.action'
import { debug, handleError } from '@/lib/utils/dev'
import { ICategory } from '@/lib/models/category.model'
import { toastErrors, toastSuccess } from '@/lib/utils/toasts'
import { Result } from '@/lib/types/results'
import { Option } from '@/lib/types'

// CREATE
export const handleCreateCategory = async (
	e: any,
	newLabel: string,
	setNewLabel: React.Dispatch<string>
) => {
	e.stopPropagation()
	e.preventDefault()
	try {
		debug(3)
		const { errors, success }: Result<ICategory> = await createCategory(
			newLabel
		)
		if (errors) {
			toastErrors(Object.keys(errors))
		} else if (success) {
			toastSuccess('Category added')
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
			const { errors, success }: Result<ICategory> = await updateCategory(
				editedOption.label,
				editedLabel
			)
			if (errors) {
				debug(6, 9, errors)
				toastErrors(Object.keys(errors))
			} else if (success) {
				toastSuccess('Category updated')
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
		const { errors, success }: Result<ICategory> = await deleteCategory(
			option.label
		)
		if (errors) {
			toastErrors(Object.keys(errors))
		} else if (success) {
			toastSuccess('Category deleted')
		}
	} catch (error) {
		handleError(error)
	}
}
