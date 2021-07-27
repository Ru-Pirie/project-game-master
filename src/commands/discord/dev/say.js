module.exports = {
	name: 'say',
	description: 'Get the bot to say something',
	usage: 'say [message]',
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
		message.channel.send(args.join(' '));
	},
};