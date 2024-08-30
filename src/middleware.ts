import { authMiddleware } from '@clerk/nextjs'
import { routes } from '@/lib/constants/paths'

export default authMiddleware({
	publicRoutes: [
		routes.API_CLERK,
		routes.API_STRIPE,
		routes.HOME,
		routes.PROJECTS_SLUGS,
		routes.PROJECTS,
		routes.SEARCH,
	],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
