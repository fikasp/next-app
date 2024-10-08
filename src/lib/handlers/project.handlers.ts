// lib
import {
	createProject,
	deleteProject,
	updateProject,
	addImageToProject,
	removeImageFromProject,
	updateImageInProject,
	setProjectCover,
	removeProjectCover,
} from '@/lib/actions/project.actions'
import { debug, handleError } from '@/lib/utils/dev'
import { IImage } from '@/lib/models/image.model'
import { IProject } from '@/lib/models/project.model'
import { ProjectFormValues } from '@/lib/types/zod'
import { toastError, toastSuccess } from '@/lib/utils/toasts'
import { uploadToCloudinary } from '@/lib/utils/services'
import { UploadedImage } from '@/lib/types'
import { txt } from '@/lib/constants/texts'

// CREATE
// Create new project
export const handleCreateProject = async (
	projectFormData: ProjectFormValues
): Promise<IProject | undefined> => {
	try {
		const { errors, data: createdProject }: Result<IProject> =
			await createProject(projectFormData)
		if (errors) {
			toastError(errors)
		} else if (createdProject) {
			debug(2, 9, createdProject)
			toastSuccess(
				`${txt.toasts.PROJECT} ${createdProject.title} ${txt.toasts.PROJECT_ADDED}`
			)
			return createdProject
		}
	} catch (error) {
		console.error(handleError(error))
	}
}

// UPDATE
// Update project data
export const handleUpdateProject = async (
	projectFormData: ProjectFormValues,
	project: IProject
): Promise<IProject | undefined> => {
	try {
		const { errors, data: updatedProject }: Result<IProject> =
			await updateProject(project.slug, projectFormData)
		if (errors) {
			toastError(errors)
		} else if (updatedProject) {
			debug(4, 9, updatedProject)
			toastSuccess(
				`${txt.toasts.PROJECT} ${projectFormData.title} ${txt.toasts.PROJECT_UPDATED}`
			)
			return updatedProject
		}
	} catch (error) {
		console.error(handleError(error))
	}
}

// Add image to project
export const handleAddImageToProject = async (file: File, slug: string) => {
	debug(2, 9, file)
	try {
		// Upload image
		const uploadedImage: UploadedImage | undefined = await uploadToCloudinary(
			file
		)

		if (!uploadedImage) {
			toastError(txt.toasts.IMAGE_UPLOAD_FAILED)
			return
		} else {
			// Add image to project
			const { data: addedImage } = await addImageToProject({
				slug,
				...uploadedImage,
			})
			if (addedImage) {
				toastSuccess(
					`${txt.toasts.IMAGE} ${addedImage.name} ${txt.toasts.IMAGE_ADDED}`
				)
			}
		}
	} catch (error) {
		console.error(handleError(error))
		toastError(handleError(error))
	}
}

// Edit image in project
export const handleUpdateImageInProject = async (file: File, image: IImage) => {
	debug(4, 9, file)
	try {
		// Upload image
		const uploadedImage: UploadedImage | undefined = await uploadToCloudinary(
			file
		)

		if (!uploadedImage) {
			toastError(txt.toasts.IMAGE_UPLOAD_FAILED)
			return
		} else {
			// Update image in project
			const { data: updatedImage } = await updateImageInProject({
				image,
				...uploadedImage,
			})
			if (updatedImage) {
				toastSuccess(
					`${txt.toasts.IMAGE} ${image.name} ${txt.toasts.IMAGE_UPDATED} ${updatedImage.name}.`
				)
				return updatedImage
			}
		}
	} catch (error) {
		console.error(handleError(error))
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
			toastSuccess(
				`${txt.toasts.IMAGE} ${image.name} ${txt.toasts.IMAGE_DELETED}`
			)
		}
	} catch (error) {
		console.error(handleError(error))
	}
}

// Set project cover
export const handleSetProjectCover = async (
	project: IProject,
	image: IImage
) => {
	debug(4, 0, project)
	try {
		const { errors, data: updatedProject } = await setProjectCover(
			project.slug,
			image
		)
		if (errors) {
			toastError(errors)
		} else if (updatedProject) {
			toastSuccess(
				`${txt.toasts.IMAGE} ${image.name} ${txt.toasts.IMAGE_COVER_SET}`
			)
			return updatedProject
		}
	} catch (error) {
		console.error(handleError(error))
	}
}

// Remove project cover
export const handleRemoveProjectCover = async (project: IProject) => {
	debug(4, 0, project)
	try {
		const { errors, data: updatedProject } = await removeProjectCover(
			project.slug
		)
		if (errors) {
			toastError(errors)
		} else if (updatedProject) {
			toastSuccess(txt.toasts.IMAGE_COVER_REMOVE)
			return updatedProject
		}
	} catch (error) {
		console.error(handleError(error))
	}
}

// DELETE
// Delete project
export const handleDeleteProject = async (project: IProject) => {
	debug(5, 9, project)
	try {
		const { data: deletedProject } = await deleteProject(project._id)
		if (deletedProject) {
			toastSuccess(
				`${txt.toasts.PROJECT} ${deletedProject.title} ${txt.toasts.PROJECT_DELETED}`
			)
		}
	} catch (error) {
		console.error(handleError(error))
	}
}
