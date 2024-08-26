module.exports = {
	async up(db, client) {
		await db
			.collection('users')
			.updateMany({ admin: { $exists: false } }, { $set: { admin: false } })
	},

	async down(db, client) {
		await db
			.collection('users')
			.updateMany({ admin: { $exists: true } }, { $unset: { admin: '' } })
	},
}
