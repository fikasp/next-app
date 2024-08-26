require('dotenv').config()

const config = {
	mongodb: {
		url: process.env.MONGODB_URL,
		databaseName: process.env.MONGODB_DB,

		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},

	migrationsDir: 'migrations',
	changelogCollectionName: 'changelog',
	migrationFileExtension: '.js',
	moduleSystem: 'commonjs',
	useFileHash: false,
}

module.exports = config
