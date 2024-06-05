'use client'
// modules
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import ArwFlex from '@/components/arw/ArwFlex'
import ArwForm from '@/components/arw/ArwForm'
import ArwFormField from '@/components/arw/ArwFormField'
import ArwTitle from '@/components/arw/ArwTitle'
// lib
import { createProject, updateProject } from '@/lib/actions/project.action'
import { IProject } from '@/lib/models/project.model'
import { ProjectFormData } from '@/lib/types'
import { projectSchema } from '@/lib/zod'
import { routes } from '@/navigation'

export default function ProjectForm({
	project,
	close,
}: {
	project?: IProject
	close?: () => void
}) {
	const { toast } = useToast()
	const router = useRouter()

	const defaultValues: ProjectFormData = {
		title: '',
		info: '',
	}

	const initialValues: ProjectFormData = project
		? { title: project.title, info: project.info }
		: defaultValues
	// Form
	const form = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: initialValues,
	})

	const onSubmit = async (itemFormData: ProjectFormData) => {
		try {
			if (project) {
				// Update project
				const updatedItem = await updateProject(project.slug, itemFormData)
				if (updatedItem) {
					toast({
						title: 'Project updated!',
						description: `${itemFormData.title} is successfully updated`,
					})
				}
				if (close) {
					close()
				}
			} else {
				// Create project
				const newItem = await createProject(itemFormData)
				if (newItem) {
					toast({
						title: 'Project added!',
						description: `${itemFormData.title} is successfully added`,
					})
				}
			}
		} catch (err) {
			console.error(err)
		}
		router.push(routes.PROFILE)
	}

	return (
		// prettier-ignore
		<ArwForm 
			form={form} 
			onSubmit={onSubmit} 
			className="grow justify-between gap-8"
		>
			<ArwTitle center accent>
				{project ? "Update project" : "Add new project"}
			</ArwTitle>
			
			<ArwFlex>
				<ArwFormField
					control={form.control} 
					name="title"
					label="Title" 
					className="justify-center"
					render={({ field }) => (
						<Input
							placeholder="Title"
							className="text-center"
							{...field}
						/>
					)}
				/>
				<ArwFormField
					control={form.control} 
					name="info"
					label="Info" 
					className="justify-center"
					render={({ field }) => (
						<Input
							placeholder="Info"
							className="text-center"
							{...field}
						/>
					)}
				/>
			</ArwFlex>
			<ArwFlex>
				<Button variant="accent">
					{project ? "Update project" : "Add project"}
				</Button>
			</ArwFlex>
		</ArwForm>
	)
}
