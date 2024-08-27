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
import { ProjectFormData } from '@/lib/types/zod'
import { Result } from '@/lib/types'
import { toastError, toastSuccess } from '@/lib/utils/toasts'
import { uploadToCloudinary } from '@/lib/utils/services'
import { UploadedImage } from '@/lib/types'

// CREATE
// Create new project
export const handleCreateProject = async (
	projectFormData: ProjectFormData
): Promise<IProject | undefined> => {
	try {
		const { error, data: createdProject }: Result<IProject> =
			await createProject(projectFormData)
		if (error) {
			toastError(error)
		} else if (createdProject) {
			debug(2, 9, createdProject)
			toastSuccess(`Project ${createdProject.title} successfully added.`)
			return createdProject
		}
	} catch (error) {
		console.error(handleError(error))
	}
}

// UPDATE
// Update project data
export const handleUpdateProject = async (
	projectFormData: ProjectFormData,
	project: IProject
): Promise<IProject | undefined> => {
	try {
		const { error, data: updatedProject }: Result<IProject> =
			await updateProject(project.slug, projectFormData)
		if (error) {
			toastError(error)
		} else if (updatedProject) {
			debug(4, 9, updatedProject)
			toastSuccess(`Project ${projectFormData.title} successfully updated.`)
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
			toastError('Image upload failed.')
			return
		} else {
			// Add image to project
			const { data: addedImage } = await addImageToProject({
				slug,
				...uploadedImage,
			})
			if (addedImage) {
				toastSuccess(`Image ${addedImage.name} successfully added.`)
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
			toastError('Image upload failed.')
			return
		} else {
			// Update image in project
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
			toastSuccess(`Image ${image.name} successfully removed.`)
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
		const { error, data: updatedProject } = await setProjectCover(
			project.slug,
			image
		)
		if (error) {
			toastError(error)
		} else if (updatedProject) {
			toastSuccess(`Image ${image.name} successfully set as cover.`)
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
		const { error, data: updatedProject } = await removeProjectCover(
			project.slug
		)
		if (error) {
			toastError(error)
		} else if (updatedProject) {
			toastSuccess(`Cover image successfully removed.`)
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
			toastSuccess(`Project ${deletedProject.title} successfully deleted.`)
		}
	} catch (error) {
		console.error(handleError(error))
	}
}
