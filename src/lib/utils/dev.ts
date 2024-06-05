import chalk, { ChalkInstance } from 'chalk'

// Debug log
export function debug(mode: number, data?: any) {
	const activeData = true
	const activeModes = [1, 2, 3]
	const modes: { [key: number]: ChalkInstance } = {
		0: chalk.gray,
		1: chalk.cyan,
		2: chalk.yellow,
		3: chalk.red,
	}
	if (!activeModes.includes(mode)) return

	const stack = new Error().stack
	const callerFunction = stack?.split('\n')[2].trim().split(' ')[1]
	const logFunction: ChalkInstance = modes[mode] || chalk.white
	console.log(logFunction(`<!-- ${callerFunction} -->`))

	if (data && activeData) {
		console.log(data)
	}
}

// Error handler
export const handleError = (error: unknown) => {
	if (error instanceof Error) {
		// This is a native JavaScript error
		console.error(error.message)
		throw new Error(`Error: ${error.message}`)
	} else if (typeof error === 'string') {
		// This is a string error message
		console.error(error)
		throw new Error(`Error: ${error}`)
	} else {
		// This is an unknown type of error
		console.error(error)
		throw new Error(`Unknown error: ${JSON.stringify(error)}`)
	}
}
