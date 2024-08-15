// lib
import {
	createProject,
	deleteProject,
	updateProject,
	addImageToProject,
	removeImageFromProject,
	updateImageInProject,
} from '@/lib/actions/project.actions'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'
import { ProjectFormData } from '@/lib/types/zod'
import { Result } from '@/lib/types/results'
import { toastError, toastSuccess } from '@/lib/utils/toasts'
import { UploadedImage } from '@/lib/types/shared'
import { uploadImage } from '@/lib/actions/image.actions'
import { debug, handleError } from '@/lib/utils/dev'

// CREATE
// Create new project
export const handleCreateProject = async (projectFormData: ProjectFormData) => {
	try {
		const { error, data: createdProject }: Result<IProject> =
			await createProject(projectFormData)
		if (error) {
			toastError(error)
		} else if (createdProject) {
			debug(2, 9, createdProject)
			toastSuccess(`Project ${createdProject.title} successfully added.`)
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
	try {
		const { error, data: updatedProject }: Result<IProject> =
			await updateProject(project.slug, projectFormData)
		if (error) {
			toastError(error)
		} else if (updatedProject) {
			debug(4, 9, updatedProject)
			toastSuccess(`Project ${projectFormData.title} successfully updated.`)
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
		const { data: addedImage } = await addImageToProject({
			slug,
			...uploadedImage,
		})
		if (addedImage) {
			toastSuccess(`Image ${addedImage.name} successfully added.`)
			return addedImage
		}
	} catch (error) {
		handleError(error)
	}
}

// Edit image in project
export const handleUpdateImageInProject = async (
	formData: FormData,
	image: IImage
) => {
	debug(4, 9, formData)
	try {
		const uploadedImage: UploadedImage = await uploadImage(formData)
		const { data: updatedImage } = await updateImageInProject({
			image,
			...uploadedImage,
		})
		if (updatedImage) {
			toastSuccess(
				`Image ${image.name} successfully updated to ${updatedImage.name}.`
			)
			return updatedImage
		}
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
			toastSuccess(`Image ${image.name} successfully removed.`)
		}
	} catch (error) {
		handleError(error)
	}
}

// DELETE
// Delete project
export const handleDeleteProject = async (project: IProject) => {
	debug(5, 9, project)
	try {
		const { data: deletedProject } = await deleteProject(project._id)
		if (deletedProject) {
			toastSuccess(`Project ${deletedProject.title} successfully deleted.`)
		}
	} catch (err) {
		handleError(err)
	}
}
