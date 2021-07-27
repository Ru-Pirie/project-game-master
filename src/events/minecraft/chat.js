const { lookup } = require('../../functions/utility');

module.exports = async (client, bot, username, message, translate, jsonMsg, matches) => {
	if (username === bot.username) return;
	const messageArray = message.split(/ +/);
	const args = messageArray.slice(1);

	const command = client.mcCommands.get(messageArray[0].slice(client.get('prefix').length).toLowerCase());

	if (message.startsWith(client.get('prefix')) && command) {
		if (args.length >= command.command.args) {
			command.execute(client, bot, message, args);
		}
		else { await bot.chat('args err'); }
	}
};