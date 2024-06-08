'use server'
// modules
import { UTApi } from 'uploadthing/server'
// lib
import { handleError } from '@/lib/utils/dev'
import { deepClone } from '@/lib/utils'
const utapi = new UTApi()

export async function deleteFiles(files: string[]) {
	try {
		const response = await utapi.deleteFiles(files)
		return deepClone(response)
	} catch (err) {
		handleError(err)
	}
}
