export interface Result<T> {
	success: boolean
	errors?: { [key: string]: string }
	data?: T
}

export interface DataResult<T> {
	success: boolean
	errors?: { [key: string]: string }
	data: T
}

export type Adjacent<T> = {
	prev: T | null
	current: T | null
	next: T | null
}