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
import { toastError, toastSuccess } from '@/lib/utils/toasts'
import { uploadImage } from '@/lib/actions/image.action'
import { UploadedImage } from '@/lib/types'
import { routes } from '@/navigation'

// CREATE
export const handleCreateProject = async (projectFormData: ProjectFormData) => {
	debug(2, 9, projectFormData)
	try {
		const { errors, data: createdProject }: Result<IProject> =
			await createProject(projectFormData)
		if (errors) {
			toastError(Object.values(errors))
		} else if (createdProject) {
			debug(9, 9, createdProject)
			toastSuccess(`${createdProject.title} is successfully added.`)
		}
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
// Update project data
export const handleUpdateProject = async (
	projectFormData: ProjectFormData,
	project: IProject
) => {
	debug(4, 9, projectFormData)
	try {
		const { errors, data: updatedProject }: Result<IProject> =
			await updateProject(project.slug, projectFormData)
		if (errors) {
			toastError(Object.values(errors))
		} else if (updatedProject) {
			toastSuccess(`${projectFormData.title} is successfully updated.`)
		}
	} catch (err) {
		handleError(err)
	}
}

// Add image to project
export const handleAddImageToProject = async (
	formData: FormData,
	slug: string
) => {
	debug(2, 9, formData)
	try {
		const uploadedImage: UploadedImage = await uploadImage(formData)
		await addImageToProject({ slug, ...uploadedImage })
	} catch (error) {
		handleError(error)
	}
}
// Remove image from project
export const handleRemoveImageFromProject = async (
	project: IProject,
	image: IImage
) => {
	debug(5, 9, image)
	try {
		const { data: updatedProject } = await removeImageFromProject(
			project.slug,
			image
		)
		if (updatedProject) {
			toastSuccess('The image successfully removed.')
		}
	} catch (error) {
		handleError(error)
	}
}

// DELETE
export const handleDeleteProject = async (
	router: AppRouterInstance,
	project: IProject,
	close: () => void
) => {
	debug(5, 9, project)
	try {
		const { data: deletedProject } = await deleteProject(project._id)
		if (deletedProject) {
			toastSuccess(`${deletedProject.title} is successfully deleted.`)
			close()
		}
	} catch (err) {
		handleError(err)
	}
	router.push(routes.PROFILE)
}
