'use server'
// modules
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
// lib
import { connectToDatabase } from '@/lib/utils/mongoose'
import { CreateUserData, UpdateUserData } from '@/lib/types/shared'
import { deepClone } from '@/lib/utils'
import { handleError } from '@/lib/utils/dev'
import { IUser, UserModel } from '@/lib/models/user.model'
import { routes } from '@/lib/constants/paths'

// CREATE
export async function createUser(user: CreateUserData) {
	try {
		await connectToDatabase()

		const newUser = await UserModel.create(user)
		revalidatePath(routes.PROJECTS)

		return deepClone(newUser)
	} catch (error) {
		console.error(handleError(error))
	}
}

// READ
export async function getUser(clerkId: string | null) {
	try {
		await connectToDatabase()

		const user = await UserModel.findOne({ clerkId })

		if (!user) {
			return null
		} else {
			return deepClone(user)
		}
	} catch (error) {
		console.error(handleError(error))
	}
}

export async function getCurrentUser() {
	try {
		const { userId } = auth()
		const currentUser: IUser = await getUser(userId)

		return deepClone(currentUser)
	} catch (error) {
		console.error(handleError(error))
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

		return deepClone(updatedUser)
	} catch (error) {
		console.error(handleError(error))
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

		return deletedUser ? deepClone(deletedUser) : null
	} catch (error) {
		console.error(handleError(error))
	}
}
