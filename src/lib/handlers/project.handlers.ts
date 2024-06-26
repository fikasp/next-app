// modules
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
// lib
import {
	createProject,
	deleteProject,
	updateProject,
	addImageToProject,
	removeImageFromProject,
} from '@/lib/actions/project.action'
import { debug, handleError } from '@/lib/utils/dev'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'
import { ProjectFormData } from '@/lib/utils/zod'
import { Result } from '@/lib/types'
import { toastArw, toastErrors, toastSuccess } from '@/lib/utils/toasts'
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
					toastArw(`${projectFormData.title} is successfully updated`)
					router.push(routes.PROFILE)
				}
				if (close) {
					close()
				}
			} else {
				// Create project
				const { errors, data }: Result<IProject> = await createProject(
					projectFormData
				)
				if (errors) {
					toastErrors(errors)
				} else if (data) {
					debug(9, 9, data)
					toastSuccess(`${data.title} is successfully added`)
					router.push(routes.PROFILE)
				}
			}
		} catch (err) {
			handleError(err)
		}
	}

// Delete project
export const handleDelete =
	(router: AppRouterInstance, project: IProject, close: () => void) =>
	async () => {
		try {
			const deletedProject = await deleteProject(project._id)
			toastArw(`${deletedProject.title} is successfully deleted`)
			close()
		} catch (err) {
			handleError(err)
		}
		router.push(routes.PROFILE)
	}

// Add image to project
export const handleAddImage = async (
	project: IProject,
	imageUrl: string,
	imageName: string
) => {
	try {
		if (project) {
			const updatedProject = await addImageToProject(
				project.slug,
				imageUrl,
				imageName
			)
			if (updatedProject) {
				toastArw('New image is successfully added')
			}
		}
	} catch (error) {
		handleError(error)
	}
}

// Remove image from project
export const handleRemoveImage =
	(project: IProject, image: IImage) => async () => {
		try {
			const updatedProject = await removeImageFromProject(
				project.slug,
				image._id,
			)
			if (updatedProject) {
				toastArw('The image has been successfully removed')
			}
		} catch (error) {
			handleError(error)
		}
	}
