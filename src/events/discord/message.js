module.exports = async (client, bot, message) => {
	if (!message.author.bot && message.channel.type === 'text') {
		const messageArray = message.content.split(/ +/);
		const args = messageArray.slice(1);

		const command = client.commands.get(messageArray[0].slice(client.get('prefix').length).toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(messageArray[0].slice(client.get('prefix').length).toLowerCase()));

		if (!command && message.channel.id === client.get('gamesChannel')) return message.delete();

		if (message.channel.id === client.get('logsChannel') && message.author.id !== client.user.id) return message.delete();

		if (message.channel.id === client.get('linkingChannel')) {
			if (message.content.split(' ').length > 1) {
				await message.delete();
				const msg = await message.channel.send('Not a valid mc username');
				return msg.delete({ timeout: 7500 });
			}

			const uuidResut = await client.apiFetch.rawMojang(`users/profiles/minecraft/${message.content}`);
			const hypixelPlayerSocials = await client.apiFetch.playerSocials(uuidResut.id);

			if (!hypixelPlayerSocials.links) {
				await message.delete();
				const msg = await message.channel.send('Not a real player or one who hasnt joined hypixel before');
				return msg.delete({ timeout: 7500 });
			}

			if (hypixelPlayerSocials.links.DISCORD) {
				if (message.author.tag === hypixelPlayerSocials.links.DISCORD) {
					await message.delete();
					const msg = await message.channel.send('you are who you say you are');
					return msg.delete({ timeout: 7500 });
				}
				else {
					await message.delete();
					const msg = await message.channel.send('youra liar');
					msg.delete({ timeout: 7500 });
				}
			}
			else {
				await message.delete();
				const msg = await message.channel.send('You dont ahve  a linked discord');
				msg.delete({ timeout: 7500 });
			}

			return true;
		}

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