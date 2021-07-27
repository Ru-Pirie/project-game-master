const { lookup } = require('../../../functions/utility');

module.exports = {
	name: 'search',
	description: 'Search for a game on hypixel',
	usage: 'search [game]',
	category: __dirname.split('/').slice(-1).pop(),
	permissions: {
		usernames: [],
	},
	command: {
		args: 0,
	},
	async execute(client, bot, message, args) {
		const result = lookup(args.join(' ').toLowerCase());
		bot.chat(`Game: ${result.bestMatch.target}, Match: ${Math.round(result.bestMatch.rating * 100)}%`);
	},
};