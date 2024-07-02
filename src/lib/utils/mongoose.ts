// modules
import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL
const MONGODB_DB = process.env.MONGODB_DB

interface MongooseConnection {
	connection: Mongoose | null
	promise: Promise<Mongoose> | null
}

let cached: MongooseConnection = (global as any).mongoose || {
	connection: null,
	promise: null,
}

export const connectToDatabase = async () => {
	if (cached.connection) return cached.connection

	if (!MONGODB_URL) throw new Error('Missing MONGODB_URL')

	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URL, {
			dbName: MONGODB_DB,
			bufferCommands: false,
		})

	cached.connection = await cached.promise

	return cached.connection
}
