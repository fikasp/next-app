'use client'
// modules
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import {
	ArwButton,
	ArwFlex,
	ArwForm,
	ArwFormField,
	ArwSelect,
	ArwTitle,
} from '@/components/arw'
// lib
import {
	handleCreateProject,
	handleUpdateProject,
} from '@/lib/handlers/project.handlers'
import { debug, handleError } from '@/lib/utils/dev'
import { extractBaseRoute, generateUrl, getEntityText } from '@/lib/utils'
import { FormFieldType } from '@/lib/types/enums'
import { ICategory } from '@/lib/models/category.model'
import { IProject } from '@/lib/models/project.model'
import { Option } from '@/lib/types'
import { projectFormSchema, ProjectFormValues } from '@/lib/types/zod'
import { routes } from '@/lib/constants/paths'
import { txt } from '@/lib/constants'

export default function ProjectForm({
	project,
	categories,
	handleClose,
}: {
	project?: IProject
	categories: ICategory[]
	handleClose?: () => void
}) {
	debug(8, 0, project)
	const router = useRouter()
	const pathname = usePathname()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const categoryOptions: Option[] = categories.map((category: ICategory) => ({
		value: category.label,
		label: category.label,
	}))

	// Form
	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			title: project?.title || '',
			category: project?.category?.label || '',
			info: project?.info || '',
		},
	})

	// Submit
	const handleSubmit = async (projectFormValues: ProjectFormValues) => {
		debug(1, 9, projectFormValues)
		setIsSubmitting(true)
		try {
			if (project) {
				// Update project
				const updatedProject = await handleUpdateProject(
					projectFormValues,
					project
				)
				if (updatedProject) {
					router.push(extractBaseRoute(pathname))
				}
			} else {
				// Create project
				const createdProject = await handleCreateProject(projectFormValues)
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
		<ArwForm<ProjectFormValues>
			form={form}
			onSubmit={handleSubmit}
			className="grow justify-between gap-8"
			center
		>
			{/* Title */}
			<ArwTitle accent center>
				{getEntityText(project, txt.common.PROJECT)}
			</ArwTitle>

			{/* Fields */}
			<ArwFlex>
				<ArwFormField<ProjectFormValues>
					type={FormFieldType.INPUT}
					placeholder={txt.forms.TITLE_PLACEHOLDER}
					label={txt.forms.TITLE_LABEL}
					name="title"
				/>
				<ArwFormField<ProjectFormValues>
					type={FormFieldType.INPUT}
					placeholder={txt.forms.INFORMATION_PLACEHOLDER}
					label={txt.forms.INFORMATION_LABEL}
					name="info"
				/>
				<ArwFormField<ProjectFormValues>
					name="category"
					label={txt.forms.CATEGORY_LABEL}
					render={(field) => (
						<ArwSelect
							field={field}
							options={categoryOptions}
							placeholder={txt.forms.CATEGORY_PLACEHOLDER}
							search
							manage
						/>
					)}
				/>
			</ArwFlex>

			{/* Submit*/}
			<ArwButton accent isSubmitting={isSubmitting}>
				{getEntityText(project, txt.common.PROJECT, isSubmitting)}
			</ArwButton>
		</ArwForm>
	)
}
