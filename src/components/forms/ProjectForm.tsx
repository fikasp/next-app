'use client'
// modules
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import {
	ArwFlex,
	ArwForm,
	ArwFormField,
	ArwSelect,
	ArwTitle,
} from '@/components/arw'
import { Button } from '@/components/ui/button'
import CategoryDialog from '@/components/dialogs/CategoryDialog'
// lib
import {
	handleCreateProject,
	handleUpdateProject,
} from '@/lib/handlers/project.handlers'
import { debug, handleError } from '@/lib/utils/dev'
import { extractBaseRoute, generateUrl, getButtonText } from '@/lib/utils'
import { FormFieldType } from '@/lib/types/enums'
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { Option } from '@/lib/types'
import { projectSchema, ProjectFormData } from '@/lib/types/zod'
import { routes } from '@/lib/constants/paths'

export default function ProjectForm({
	project,
	categories,
	handleClose,
}: {
	project?: IProject
	categories: ICategory[]
	handleClose?: () => void
}) {
	debug(0, 0, project)
	const router = useRouter()
	const pathname = usePathname()
	const [isSubmitting, setIsSubmitting] = useState(false)
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
		setIsSubmitting(true)
		try {
			if (project) {
				// Update project
				const updatedProject = await handleUpdateProject(
					projectFormData,
					project
				)
				if (updatedProject) {
					router.push(extractBaseRoute(pathname))
				}
			} else {
				// Create project
				const createdProject = await handleCreateProject(projectFormData)
				if (createdProject) {
					router.push(generateUrl([routes.PROFILE, createdProject.slug]))
				}
			}
			if (handleClose) {
				handleClose()
			}
		} catch (error) {
			console.error(handleError(error))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<ArwForm<ProjectFormData>
				form={form}
				onSubmit={handleSubmit}
				className="grow justify-between gap-8"
				// grid="grid-cols-[90px_auto]"
				center
			>
				<ArwTitle center accent>
					{project ? 'Update project' : 'Add new project'}
				</ArwTitle>

				<ArwFlex className="gap-5">
					<ArwFormField<ProjectFormData>
						type={FormFieldType.INPUT}
						placeholder="Enter a title"
						label="Title"
						name="title"
					/>
					<ArwFormField<ProjectFormData>
						type={FormFieldType.INPUT}
						placeholder="Enter a information"
						label="Information"
						name="info"
					/>
					<ArwFormField<ProjectFormData>
						name="category"
						label="Category"
						render={(field) => (
							<>
								<ArwSelect
									onValueChange={field.onChange}
									defaultValue={field.value}
									placeholder="Select a category"
									options={categoryOptions}
									search
								>
									<CategoryDialog options={categoryOptions} />
								</ArwSelect>
							</>
						)}
					/>
				</ArwFlex>
				<ArwFlex>
					<Button variant="accent" disabled={isSubmitting}>
						{getButtonText(isSubmitting, project, 'project')}
					</Button>
				</ArwFlex>
			</ArwForm>
		</>
	)
}
