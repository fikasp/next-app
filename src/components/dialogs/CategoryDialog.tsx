// modules
import { useEffect, useRef, useState } from 'react'
// components
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import ArwButton from '@/components/arw/ArwButton'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/lib/actions/category.action'
import { debug, handleError } from '@/lib/utils/dev'
import { ICategory } from '@/lib/models/category.model'
import { icons } from '@/navigation'
import { Option, Result } from '@/lib/types'
import { toastErrors, toastSuccess } from '@/lib/utils/toasts'

export default function CategoryDialog({
	options,
	setOptions,
}: {
	options: Option[]
	setOptions: React.Dispatch<React.SetStateAction<Option[]>>
}) {
	debug(0, 0, options)
	const [newLabel, setNewLabel] = useState('')
	const [editedLabel, setEditedLabel] = useState('')
	const [editedOption, setEditedOption] = useState<Option | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	// CREATE
	const handleCreateCategory = async (e: any) => {
		e.stopPropagation()
		e.preventDefault()
		try {
			debug(3, 9)
			const { errors, success }: Result<ICategory> = await createCategory(
				newLabel
			)
			if (errors) {
				toastErrors(errors)
			} else if (success) {
				setOptions((prevOptions) => [
					...prevOptions,
					{ value: newLabel, label: newLabel },
				])
				toastSuccess('Category added')
				setNewLabel('')
			}
		} catch (error) {
			handleError(error)
		}
	}

	// UPDATE
	const handleUpdateCategory = async () => {
		if (editedOption) {
			debug(4, 9)
			try {
				const { errors, success }: Result<ICategory> = await updateCategory(
					editedOption.label,
					editedLabel
				)
				if (errors) {
					toastErrors(errors)
				} else if (success) {
					setOptions((prevOptions) =>
						prevOptions.map((prevOption) =>
							prevOption.label === editedOption.label
								? { ...prevOption, label: editedLabel }
								: prevOption
						)
					)
					toastSuccess('Category updated')
					setEditedOption(null)
					setEditedLabel('')
				}
			} catch (error) {
				handleError(error)
			}
		}
	}

	// DELETE
	const handleDeleteCategory = async (option: Option) => {
		try {
			debug(5, 9)
			const { errors, success }: Result<ICategory> = await deleteCategory(
				option.label
			)
			if (errors) {
				toastErrors(errors)
			} else if (success) {
				setOptions((prevOptions) =>
					prevOptions.filter((prevOption) => prevOption.label !== option.label)
				)
				toastSuccess('Category deleted')
			}
		} catch (error) {
			handleError(error)
		}
	}

	const handleEditClick = (option: Option) => {
		setEditedOption(option)
		setEditedLabel(option.label)
	}
	const handleCancelClick = () => {
		setEditedOption(null)
	}

	useEffect(() => {
		if (editedOption && inputRef.current) {
			inputRef.current.focus()
		}
	}, [editedOption])

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="outline" className="p-2 w-full">
					Manage options
				</Button>
			</DialogTrigger>

			<DialogContent className="flex flex-col w-full-4 max-h-screen-4 max-w-md">
				<ArwTitle center accent>
					Manage options
				</ArwTitle>
				<ArwFlex className="overflow-auto">
					<ArwFlex className="p-2">
						{options.map((option) => (
							<ArwFlex row between key={option.label}>
								{editedOption?.label === option.label ? (
									<>
										<input
											ref={inputRef}
											value={editedLabel}
											className="w-full bg-base-100 dark:bg-base-800 focus:outline-none"
											onChange={(e) => setEditedLabel(e.target.value)}
											onKeyDown={(e) => e.stopPropagation()}
										/>
										<ArwFlex row>
											<ArwButton
												onClick={handleUpdateCategory}
												src={icons.SAVE}
											/>
											<ArwButton
												onClick={handleCancelClick}
												src={icons.CANCEL}
											/>
										</ArwFlex>
									</>
								) : (
									<>
										<ArwText>{option.label}</ArwText>
										<ArwFlex row>
											<ArwButton
												onClick={() => handleEditClick(option)}
												src={icons.EDIT}
											/>
											<ArwButton
												onClick={() => handleDeleteCategory(option)}
												src={icons.DELETE}
											/>
										</ArwFlex>
									</>
								)}
							</ArwFlex>
						))}
					</ArwFlex>
				</ArwFlex>

				<form
					onSubmit={handleCreateCategory}
					className="w-full flex flex-col gap-3"
				>
					<Input
						value={newLabel}
						onChange={(e) => setNewLabel(e.target.value)}
						onKeyDown={(e) => e.stopPropagation()}
						placeholder="Enter new category"
						className="p-2 w-full"
					/>
					<Button className="w-full">Add Option</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
