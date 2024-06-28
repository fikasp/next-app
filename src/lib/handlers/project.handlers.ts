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
import { ProjectFormData } from '@/lib/types/zod'
import { Result } from '@/lib/types/results'
import { toastError, toastSuccess, toastWarning } from '@/lib/utils/toasts'
import { routes } from '@/navigation'
import { UploadedImage } from '../types'

export const handleSubmit =
	(router: AppRouterInstance, project?: IProject, close?: () => void) =>
	async (projectFormData: ProjectFormData) => {
		try {
			if (project) {
				// Update project
				const { data: updatedProject } = await updateProject(
					project.slug,
					projectFormData
				)
				if (updatedProject) {
					toastSuccess(`${projectFormData.title} is successfully updated`)
					router.push(routes.PROFILE)
				}
				if (close) {
					close()
				}
			} else {
				// Create project
				const { errors, data: createdProject }: Result<IProject> =
					await createProject(projectFormData)
				if (errors) {
					toastError(Object.values(errors))
				} else if (createdProject) {
					debug(9, 9, createdProject)
					toastSuccess(`${createdProject.title} is successfully added`)
					router.push(routes.PROFILE)
				}
			}
		} catch (err) {
			handleError(err)
		}
	}

// Delete project
export const handleDelete = async (
	router: AppRouterInstance,
	project: IProject,
	close: () => void
) => {
	debug(5, 9, project)
	try {
		const { data: deletedProject } = await deleteProject(project._id)
		if (deletedProject) {
			toastSuccess(`${deletedProject.title} is successfully deleted`)
			close()
		}
	} catch (err) {
		handleError(err)
	}
	router.push(routes.PROFILE)
}

// Add images to project
export const handleAddImages = async (
	uploadedImages: UploadedImage[],
	slug: string
) => {
	debug(2, 9, uploadedImages)
	try {
		const promises = uploadedImages.map((image) =>
			addImageToProject({ slug, ...image })
		)
		const results = await Promise.all(promises)

		const successCount = results.filter((result) => result.success).length
		if (successCount === uploadedImages.length) {
			toastSuccess('All images have been added successfully.')
		} else {
			toastWarning(
				`${successCount} out of ${uploadedImages.length} images were added successfully.`
			)
		}
	} catch (error) {
		handleError(error)
		toastError('An error occurred while adding the images.')
	}
}

// Remove image from project
export const handleRemoveImage = async (project: IProject, image: IImage) => {
	debug(5, 9, image)
	try {
		const { data: updatedProject } = await removeImageFromProject(
			project.slug,
			image
		)
		if (updatedProject) {
			toastSuccess('The image has been successfully removed')
		}
	} catch (error) {
		handleError(error)
	}
}
