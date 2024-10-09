/* eslint-disable no-unused-vars */
export {}

declare global {
	// @class CatchAllSlugPageProps
	type CatchAllSlugPageProps = {
		params: CatchAllSlugParams
		searchParams: SearchParams
	}

	// @class CatchAllSlugParams
	interface CatchAllSlugParams {
		[key: string]: string[]
	}

	// @class CustomJwtSessionClaims
	interface CustomJwtSessionClaims {
		metadata: {
			role?: 'admin' | 'moderator'
		}
	}

	// @class DataResult
	type DataResult<T> = {
		success: boolean
		errors?: { [key: string]: string }
		data: T
	}

	// @class LayoutProps
	type LayoutProps = {
		children: React.ReactNode
	}

	// @class PageProps
	type PageProps = {
		searchParams: SearchParams
	}

	// @class Result
	type Result<T> = {
		success: boolean
		errors?: { [key: string]: string }
		data?: T
	}

	// @class SearchParams
	interface SearchParams {
		[key: string]: string | string[] | undefined
	}

	// @class SingleSlugPageProps
	type SingleSlugPageProps = {
		params: SingleSlugParams
		searchParams: SearchParams
	}

	// @class SingleSlugParams
	interface SingleSlugParams {
		[key: string]: string
	}
}
