module.exports = {
	async up(db) {
		await db
			.collection('users')
			.updateMany({ admin: { $exists: false } }, { $set: { admin: false } })
	},

	async down(db) {
		await db
			.collection('users')
			.updateMany({ admin: { $exists: true } }, { $unset: { admin: '' } })
	},
}
