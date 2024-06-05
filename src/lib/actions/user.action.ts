'use server'
// modules
import { revalidatePath } from 'next/cache'
// lib
import UserModel from '@/lib/models/user.model'
import { CreateUserData, UpdateUserData } from '@/lib/types'
import { connectToDatabase } from '@/lib/utils/mongoose'
import { handleError } from '@/lib/utils/dev'
import { routes } from '@/navigation'

// CREATE
export async function createUser(user: CreateUserData) {
	try {
		await connectToDatabase()

		const newUser = await UserModel.create(user)
		revalidatePath(routes.PROJECTS)

		return JSON.parse(JSON.stringify(newUser))
	} catch (error) {
		handleError(error)
	}
}

// READ
export async function getUser(clerkId: string | null) {
	try {
		await connectToDatabase()

		const user = await UserModel.findOne({ clerkId })

		if (!user) throw new Error('User not found')

		return JSON.parse(JSON.stringify(user))
	} catch (error) {
		handleError(error)
	}
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserData) {
	try {
		await connectToDatabase()

		const updatedUser = await UserModel.findOneAndUpdate({ clerkId }, user, {
			new: true,
		})

		if (!updatedUser) throw new Error('User update failed')

		return JSON.parse(JSON.stringify(updatedUser))
	} catch (error) {
		handleError(error)
	}
}

// DELETE
export async function deleteUser(clerkId: string) {
	try {
		await connectToDatabase()

		const userToDelete = await UserModel.findOne({ clerkId })

		if (!userToDelete) {
			throw new Error('User not found')
		}

		const deletedUser = await UserModel.findByIdAndDelete(userToDelete._id)

		return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
	} catch (error) {
		handleError(error)
	}
}
