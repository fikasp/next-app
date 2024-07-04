'use client'
// modules
import { useEffect, useRef, useState } from 'react'
// components
import { ArwButton, ArwFlex, ArwText, ArwTitle } from '@/components/arw'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
// lib
import {
	handleCreateCategory,
	handleDeleteCategory,
	handleUpdateCategory,
} from '@/lib/handlers/category.handlers'
import { Option } from '@/lib/types/shared'
import { icons } from '@/lib/constants/paths'
import { debug } from '@/lib/utils/dev'

export default function CategoryDialog({ options }: { options: Option[] }) {
	debug(8, 0, options)
	const [newLabel, setNewLabel] = useState('')
	const [editedLabel, setEditedLabel] = useState('')
	const [editedOption, setEditedOption] = useState<Option | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)

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
												onClick={() =>
													handleUpdateCategory(editedLabel, editedOption)
												}
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
					onSubmit={(e) => handleCreateCategory(e, newLabel, setNewLabel)}
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
				<DialogTrigger>
					<Button variant="accent" className="w-full">
						Close options
					</Button>
				</DialogTrigger>
			</DialogContent>
		</Dialog>
	)
}
