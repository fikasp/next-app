// modules
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
// components
import { toast } from '@/components/ui/use-toast'
// lib
import {
	createProject,
	deleteProject,
	updateProject,
	addImageToProject,
	removeImageFromProject,
} from '@/lib/actions/project.action'
import { deleteFiles } from '@/lib/actions/image.action'
import { debug, handleError } from '@/lib/utils/dev'
import { IProject } from '@/lib/models/project.model'
import { ProjectFormData } from '@/lib/utils/zod'
import { routes } from '@/navigation'

export const handleSubmit =
	(router: AppRouterInstance, project?: IProject, close?: () => void) =>
	async (projectFormData: ProjectFormData) => {
		try {
			if (project) {
				// Update project
				const updatedProject = await updateProject(
					project.slug,
					projectFormData
				)
				if (updatedProject) {
					toast({
						title: 'Project updated!',
						description: `${projectFormData.title} is successfully updated`,
					})
				}
				if (close) {
					close()
				}
			} else {
				// Create project
				const newProject = await createProject(projectFormData)
				if (newProject) {
					toast({
						title: 'Project added!',
						description: `${projectFormData.title} is successfully added`,
					})
				}
			}
		} catch (err) {
			handleError(err)
		}
		router.push(routes.PROFILE)
	}

// Delete project
export const handleDelete =
	(router: AppRouterInstance, project: IProject, close: () => void) =>
	async () => {
		try {
			const deletedProject = await deleteProject(project._id)
			toast({
				title: 'Project deleted!',
				description: `${deletedProject.title} is successfully deleted`,
			})
			close()
		} catch (err) {
			handleError(err)
		}
		router.push(routes.PROFILE)
	}

// Add image to project
export const handleAddImage = async (
	project: IProject,
	url: string,
	key?: string,
	name?: string
) => {
	try {
		if (project) {
			const updatedProject = await addImageToProject(
				project.slug,
				url,
				key,
				name
			)
			if (updatedProject) {
				toast({
					title: 'Image uploaded!',
					description: 'New image is successfully added',
				})
			}
		}
	} catch (error) {
		handleError(error)
	}
}

// Remove image from project
export const handleRemoveImage =
	(project: IProject, imageId: string, imageKey: string) => async () => {
		try {
			const updatedProject = await removeImageFromProject(project.slug, imageId)

			if (updatedProject) {
				toast({
					title: 'Image removed!',
					description: 'The image has been successfully removed',
				})
			}
			if (imageKey) {
				const deletedFile = await deleteFiles([imageKey])
				debug(0, 9, deletedFile)
			}
		} catch (error) {
			handleError(error)
		}
	}
