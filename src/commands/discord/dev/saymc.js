module.exports = {
	name: 'saymc',
	description: 'Get the bot to say something in minecraft',
	usage: 'saymc [message]',
	category: __dirname.split('/').slice(-1).pop(),
	permissions: {
		roles: [],
		users: [],
	},
	command: {
		hidden: false,
		args: 0,
	},
	async execute(client, bot, message, args) {
		await message.delete();
		bot.chat(args.join(' '));
	},
};