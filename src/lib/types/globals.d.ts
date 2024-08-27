export {}

export type Roles = 'admin' | 'moderator'

declare global {
	export interface CustomJwtSessionClaims {
		metadata: {
			role?: Roles
		}
	}
}
