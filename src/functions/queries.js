const Database = require('better-sqlite3');
const db = new Database(__dirname + '/../database/database.db');

module.exports = {
	db: db,
	insetGame: function(id, gameCmd) {

	},
};