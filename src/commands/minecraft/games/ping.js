module.exports = {
	name: 'ping',
	description: 'Ping the bot to check its latentcy',
	usage: 'ping',
	category: __dirname.split('/').slice(-1).pop(),
	permissions: {
		usernames: [],
	},
	command: {
		args: 0,
	},
	async execute(client, bot, message, args) {
		bot.chat(`Ping: ${bot.player.ping}ms`);
	},
};