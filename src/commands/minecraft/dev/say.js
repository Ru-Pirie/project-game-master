module.exports = {
	name: 'say',
	description: 'Get the bot to say something in minecraft',
	usage: 'say [message]',
	category: __dirname.split('/').slice(-1).pop(),
	permissions: {
		usernames: [],
	},
	command: {
		args: 0,
	},
	async execute(client, bot, message, args) {
		bot.chat(args.join(' '));
	},
};