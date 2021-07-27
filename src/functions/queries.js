const db = require('better-sqlite3')(__dirname + '/../database/database.db');

module.exports = {
	test: async function() {
		return true;
	},
};