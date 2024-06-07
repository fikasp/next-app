import { UTApi } from 'uploadthing/server'

import { generateReactHelpers } from '@uploadthing/react/hooks'

import type { OurFileRouter } from '@/app/api/uploadthing/core'

export const { useUploadThing, uploadFiles } =
	generateReactHelpers<OurFileRouter>()

export const utapi = new UTApi()
