import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ArwTitle from '@/components/arw/ArwTitle'
import ArwFlex from '@/components/arw/ArwFlex'
import { Option } from '@/lib/types'
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/lib/actions/category.action'
import { Input } from '@/components/ui/input'
import { debug } from '@/lib/utils/dev'
import ArwText from '../arw/ArwText'

export default function OptionsDialog({
	options,
	setOptions,
}: {
	options: Option[]
	setOptions: React.Dispatch<React.SetStateAction<Option[]>>
}) {
	debug(9, 9, options)
	const [newOption, setNewOption] = useState('')
	const [editOption, setEditOption] = useState<Option | null>(null)
	const [editLabel, setEditLabel] = useState('')

	const addOption = async () => {
		try {
			debug(9, 9, newOption)
			const response = await createCategory({ label: newOption })
			setOptions((prevOptions) => [
				...prevOptions,
				{ value: response._id, label: response.label },
			])
			setNewOption('')
		} catch (error) {
			console.error('Error adding category:', error)
		}
	}

	const handleUpdateOption = async () => {
		if (editOption) {
			try {
				await updateCategory(editOption.value, { label: editLabel })
				setOptions((prevOptions) =>
					prevOptions.map((opt) =>
						opt.value === editOption.value ? { ...opt, label: editLabel } : opt
					)
				)
				setEditOption(null)
				setEditLabel('')
			} catch (error) {
				console.error('Error updating category:', error)
			}
		}
	}

	const handleDeleteOption = async (optionValue: string) => {
		try {
			await deleteCategory(optionValue)
			setOptions((prevOptions) =>
				prevOptions.filter((opt) => opt.value !== optionValue)
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
								key={option.value}
								className="flex justify-between items-center gap-2"
							>
								{editOption?.value === option.value ? (
									<>
										<Input
											type="text"
											value={editLabel}
											className="p-2"
											onChange={(e) => setEditLabel(e.target.value)}
											onKeyDown={(e) => e.stopPropagation()}
										/>
										<ArwFlex row>
											<Button variant="secondary" onClick={handleUpdateOption}>
												Save
											</Button>
											<Button
												variant="destructive"
												onClick={() => setEditOption(null)}
											>
												Cancel
											</Button>
										</ArwFlex>
									</>
								) : (
									<>
										<ArwText>{option.label}</ArwText>
										<ArwFlex row>
											<Button
												variant="secondary"
												onClick={() => handleEditClick(option)}
											>
												Edit
											</Button>
											<Button
												variant="destructive"
												onClick={() => handleDeleteOption(option.value)}
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
						value={newOption}
						onChange={(e) => setNewOption(e.target.value)}
						onKeyDown={(e) => e.stopPropagation()}
						placeholder="Enter new category"
						className="p-2"
					/>
					<Button className="h-full" onClick={addOption}>
						Add Option
					</Button>
				</ArwFlex>
			</DialogContent>
		</Dialog>
	)
}
