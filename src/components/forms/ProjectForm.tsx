'use client'
// modules
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
import { handleCreateProject, handleUpdateProject } from '@/lib/handlers/project.handlers'
import { projectSchema, ProjectFormData } from '@/lib/types/zod'
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { debug, handleError } from '@/lib/utils/dev'
import { Option } from '@/lib/types'
import { routes } from '@/navigation'

export default function ProjectForm({
	project,
	categories,
	close,
}: {
	project?: IProject
	categories: ICategory[]
	close?: () => void
}) {
	debug(8, 9, project)
	const router = useRouter()
	const categoryOptions: Option[] = categories.map((category: ICategory) => ({
		value: category.label,
		label: category.label,
	}))

	const form = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			title: project?.title || '',
			category: project?.category?.label || '',
			info: project?.info || '',
		},
	})

	const handleSubmit = async (projectFormData: ProjectFormData) => {
		debug(1, 9, projectFormData)
		try {
			if (project) {
				// Update project
				await handleUpdateProject(projectFormData, project)
			} else {
				// Create project
				await handleCreateProject(projectFormData)
			}
			router.push(routes.PROFILE)
			if (close) {
				close()
			}
		} catch (err) {
			handleError(err)
		}
	}

	return (
		<>
			<ArwForm
				form={form}
				onSubmit={handleSubmit}
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
									<CategoryDialog options={categoryOptions} />
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
