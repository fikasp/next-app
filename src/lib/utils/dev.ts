import chalk, { ChalkInstance } from 'chalk'

// Debugging settings
const debugActive = true
const debugActiveModes = [2, 3, 4, 9]
const debugModes: { [key: number]: ChalkInstance } = {
	0: chalk.gray,
	1: chalk.gray,
	2: chalk.cyan,
	3: chalk.yellow,
	4: chalk.red,
	9: chalk.bgWhite.black,
}

// Debugging function
export function debug(logMode: number, dataMode?: number, ...data: any) {
	if (!debugActive) return

	// Log function
	if (debugActiveModes.includes(logMode as number)) {
		const stack = new Error().stack
		const callerFunction = stack?.split('\n')[2].trim().split(' ')[1]
		const chalkLog: ChalkInstance = debugModes[logMode] || chalk.white
		console.log(chalkLog(`<!-- ${callerFunction} -->`))
	}

	// Log data
	if (debugActiveModes.includes(dataMode as number) && data) {
		if (dataMode === 9) {
			data.forEach((item: any) => {
				console.log(item)
			})
		} else {
			const chalkLog: ChalkInstance =
				debugModes[dataMode as number] || chalk.white
			data.forEach((data: any) => {
				console.log(chalkLog(data))
			})
		}
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