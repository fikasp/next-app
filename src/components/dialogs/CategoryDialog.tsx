// modules
import { useState } from 'react'
// components
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwText from '@/components/arw/ArwText'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/lib/actions/category.action'
import { debug } from '@/lib/utils/dev'
import { Option } from '@/lib/types'

export default function OptionsDialog({
	options,
	setOptions,
}: {
	options: Option[]
	setOptions: React.Dispatch<React.SetStateAction<Option[]>>
}) {
	debug(9, 9, options)
	const [newLabel, setNewLabel] = useState('')
	const [editLabel, setEditLabel] = useState('')
	const [editOption, setEditOption] = useState<Option | null>(null)

	const handleCreateCategory = async () => {
		try {
			debug(1, 9, newLabel)
			if (!newLabel) return
			const response = await createCategory(newLabel)
			setOptions((prevOptions) => [
				...prevOptions,
				{ value: response.label, label: response.label },
			])
			setNewLabel('')
		} catch (error) {
			console.error('Error adding category:', error)
		}
	}

	const handleUpdateCategory = async () => {
		if (editOption) {
			debug(3, 9, editOption)
			try {
				await updateCategory(editOption.label, editLabel)
				setOptions((prevOptions) =>
					prevOptions.map((option) =>
						option.label === editOption.label
							? { ...option, label: editLabel }
							: option
					)
				)
				setEditOption(null)
				setEditLabel('')
			} catch (error) {
				console.error('Error updating category:', error)
			}
		}
	}

	const handleDeleteCategory = async (optionLabel: string) => {
		try {
			debug(4, 9, optionLabel)
			await deleteCategory(optionLabel)
			setOptions((prevOptions) =>
				prevOptions.filter((option) => option.label !== optionLabel)
			)
		} catch (error) {
			console.error('Error deleting category:', error)
		}
	}

	const handleEditClick = (option: Option) => {
		setEditOption(option)
		setEditLabel(option.label)
	}

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
				<ArwFlex className="overflow-scroll">
					<ArwFlex className="gap-2 mt-4 flex-col p-2">
						{options.map((option) => (
							<div
								key={option.label}
								className="flex justify-between items-center gap-2"
							>
								{editOption?.label === option.label ? (
									<>
										<Input
											type="text"
											value={editLabel}
											className="p-2 w-full"
											onChange={(e) => setEditLabel(e.target.value)}
											onKeyDown={(e) => e.stopPropagation()}
										/>
										<ArwFlex row className="gap-2">
											<Button
												variant="secondary"
												className="w-[75px]"
												onClick={handleUpdateCategory}
											>
												Save
											</Button>
											<Button
												variant="destructive"
												className="w-[75px]"
												onClick={() => setEditOption(null)}
											>
												Cancel
											</Button>
										</ArwFlex>
									</>
								) : (
									<>
										<ArwText className="ml-2">{option.label}</ArwText>
										<ArwFlex row className="gap-2">
											<Button
												variant="secondary"
												className="w-[75px]"
												onClick={() => handleEditClick(option)}
											>
												Edit
											</Button>
											<Button
												variant="destructive"
												className="w-[75px]"
												onClick={() => handleDeleteCategory(option.label)}
											>
												Delete
											</Button>
										</ArwFlex>
									</>
								)}
							</div>
						))}
					</ArwFlex>
				</ArwFlex>

				<ArwFlex className="p-2">
					<Input
						value={newLabel}
						onChange={(e) => setNewLabel(e.target.value)}
						onKeyDown={(e) => e.stopPropagation()}
						placeholder="Enter new category"
						className="p-2"
					/>
					<Button className="h-full" onClick={handleCreateCategory}>
						Add Option
					</Button>
				</ArwFlex>
			</DialogContent>
		</Dialog>
	)
}
