import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
	publicRoutes: ['/', '/api/clerk', '/api/stripe', '/api/uploadthing'],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
