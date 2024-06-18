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
// lib
import { IProject } from '@/lib/models/project.model'
import { projectSchema, ProjectFormData } from '@/lib/utils/zod'
import { handleSubmit } from '@/lib/handlers/project.handlers'
import { categories } from '@/lib/constants'
import ArwGrid from '../arw/ArwGrid'

export default function ProjectForm({
	project,
	close,
}: {
	project?: IProject
	close?: () => void
}) {
	const router = useRouter()

	const defaultValues: ProjectFormData = {
		title: project?.title || '',
		category: project?.category || '',
		info: project?.info || '',
	}

	const form = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues,
	})

	return (
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
						<ArwSelect
							onValueChange={field.onChange}
							defaultValue={field.value}
							placeholder="Select a category"
							options={categories}
							search
							custom
							center
						/>
					)}
				/>
			</ArwFlex>
			<ArwFlex>
				<Button variant="accent">
					{project ? 'Update project' : 'Add project'}
				</Button>
			</ArwFlex>
		</ArwForm>
	)
}
