import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
	publicRoutes: [
		'/',
		'/projects',
		'/projects/(.*)',
		'/search',
		'/api/clerk',
		'/api/stripe',
	],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
