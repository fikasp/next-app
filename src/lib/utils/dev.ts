// modules
import chalk, { ChalkInstance } from 'chalk'

// Settings
const debugActive = true
const debugActiveModes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const debugModes: { [key: number]: ChalkInstance } = {
	0: chalk.gray,
	1: chalk.gray,
	2: chalk.green,
	3: chalk.cyan,
	4: chalk.yellow,
	5: chalk.red,
	6: chalk.bgYellow.black,
	7: chalk.bgCyan.black,
	8: chalk.bgBlueBright.black,
	9: chalk.bgWhite.black,
	10: chalk.bgRed.black,
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
			data.forEach((item: any) => {
				if (typeof item === 'object') {
					console.log(chalkLog(JSON.stringify(item, null, 2)))
				} else {
					console.log(chalkLog(item))
				}
			})
		}
	}
}

// Error handler
export function handleError(error: any) {
	if (error instanceof Error) {
		// This is a native JavaScript error
		console.error(error.message)
		return `Error: ${error.message}`
	} else if (typeof error === 'string') {
		// This is a string error message
		console.error(error)
		return `Error: ${error}`
	} else {
		// This is an unknown type of error
		console.error(error)
		return `Unknown error: ${JSON.stringify(error)}`
	}
}
