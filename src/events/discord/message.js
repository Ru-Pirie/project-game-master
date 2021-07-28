const { handelLink } = require('../../functions/link');

module.exports = async (client, bot, message) => {
	if (!message.author.bot && message.channel.type === 'text') {
		const messageArray = message.content.split(/ +/);
		const args = messageArray.slice(1);

		const command = client.commands.get(messageArray[0].slice(client.get('prefix').length).toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(messageArray[0].slice(client.get('prefix').length).toLowerCase()));

		if (!command && message.channel.id === client.get('gamesChannel')) return message.delete();

		if (message.channel.id === client.get('logsChannel') && message.author.id !== client.user.id) return message.delete();

		if (message.channel.id === client.get('linkingChannel')) return handelLink(client, message);

		if (message.content.startsWith(client.get('prefix')) && command) {
			if (command.permissions.roles.some(r => message.member.roles.cache.has(r)) || command.permissions.users.includes(message.author.id) || message.member.roles.cache.has(client.get('staffRole'))) {
				if (args.length >= command.command.args) {
					command.execute(client, bot, message, args);
				}
				else { await message.channel.send('err'); }
			}
			else if (!command.command.hidden) {
				message.delete();
				await message.channel.send('perm err');
			}
		}

	}
};