'use server'
// modules
import { revalidatePath } from 'next/cache'
// database
import { connectToDatabase } from '@/database'
import User from '@/database/models/user.model'
// lib
import { CreateUserData, UpdateUserData } from '@/lib/types'
import { handleError } from '@/lib/utils'

// CREATE
export async function createUser(user: CreateUserData) {
	try {
		await connectToDatabase()

		const newUser = await User.create(user)

		return JSON.parse(JSON.stringify(newUser))
	} catch (error) {
		handleError(error)
	}
}

// READ
export async function getUserById(userId: string) {
	try {
		await connectToDatabase()

		const user = await User.findOne({ clerkId: userId })

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

		const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
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

		const userToDelete = await User.findOne({ clerkId })

		if (!userToDelete) {
			throw new Error('User not found')
		}

		const deletedUser = await User.findByIdAndDelete(userToDelete._id)
		revalidatePath('/')

		return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
	} catch (error) {
		handleError(error)
	}
}