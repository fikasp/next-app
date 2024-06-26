'use client'
// modules
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwForm from '@/components/arw/ArwForm'
import ArwFormField from '@/components/arw/ArwFormField'
import ArwSelect from '@/components/arw/ArwSelect'
import ArwTitle from '@/components/arw/ArwTitle'
import CategoryDialog from '@/components/dialogs/CategoryDialog'
// lib
import { handleSubmit } from '@/lib/handlers/project.handlers'
import { projectSchema, ProjectFormData } from '@/lib/utils/zod'
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { Option, Result } from '@/lib/types'
import { getCategories } from '@/lib/actions/category.action'
import { debug, handleError } from '@/lib/utils/dev'

export default function ProjectForm({
	project,
	close,
}: {
	project?: IProject
	close?: () => void
}) {
	debug(9)
	const router = useRouter()
	const [categoryOptions, setCategoryOptions] = useState<Option[]>([])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data }: Result<ICategory[]> = await getCategories()
				if (data) {
					const options = data.map((category: ICategory) => ({
						value: category.label,
						label: category.label,
					}))
					setCategoryOptions(options)
				}
			} catch (error) {
				handleError(error)
			}
		}
		fetchCategories()
	}, [])

	const form = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			title: project?.title || '',
			category: project?.category?.label || '',
			info: project?.info || '',
		},
	})

	return (
		<>
			<ArwForm
				form={form}
				onSubmit={handleSubmit(router, project, close)}
				className="grow justify-between gap-8"
			>
				<ArwTitle center accent>
					{project ? 'Update project' : 'Add new project'}
				</ArwTitle>

				<ArwFlex>
					<ArwFormField
						control={form.control}
						name="title"
						label="Title"
						className="justify-center"
						render={({ field }) => (
							<Input
								placeholder="Enter a title"
								className="text-center"
								{...field}
							/>
						)}
					/>
					<ArwFormField
						control={form.control}
						name="info"
						label="Information"
						className="justify-center"
						render={({ field }) => (
							<Input
								placeholder="Enter a information"
								className="text-center"
								{...field}
							/>
						)}
					/>
					<ArwFormField
						control={form.control}
						name="category"
						label="Category"
						className="justify-center"
						render={({ field }) => (
							<>
								<ArwSelect
									onValueChange={field.onChange}
									defaultValue={field.value}
									placeholder="Select a category"
									options={categoryOptions}
									search
									center
								>
									<CategoryDialog
										options={categoryOptions}
										setOptions={setCategoryOptions}
									/>
								</ArwSelect>
							</>
						)}
					/>
				</ArwFlex>
				<ArwFlex>
					<Button variant="accent">
						{project ? 'Update project' : 'Add project'}
					</Button>
				</ArwFlex>
			</ArwForm>
		</>
	)
}
