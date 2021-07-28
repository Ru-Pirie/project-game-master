const Discord = require('discord.js');

module.exports = {
	handelLink: async function(client, message) {
		await message.delete();

		if (message.content.split(' ').length > 1) {
			const msg = await message.channel.send('Not a valid mc username');
			return msg.delete({ timeout: 7500 });
		}

		const uuidResult = await client.apiFetch.rawMojang(`users/profiles/minecraft/${message.content}`);

		if (!uuidResult.id) {
			const embed = new Discord.MessageEmbed()
				.setColor('RED')
				.setDescription('Sorry, the username you provided is not a valid Minecraft username.')
				.setAuthor('Verification Error', 'https://image.flaticon.com/icons/png/512/594/594969.png');

			const msg = await message.channel.send(embed);
			return msg.delete({ timeout: 7500 });
		}

		const hypixelPlayer = await client.apiFetch.player(uuidResult.id);

		if (hypixelPlayer !== null) {
			if (hypixelPlayer.socialMedia) {
				console.log(hypixelPlayer.socialMedia)
				if (hypixelPlayer.socialMedia.links) {
					if (hypixelPlayer.socialMedia.links.DISCORD.toLowerCase() === message.member.user.tag.toLowerCase()) {
						console.log('discord matches')
					} else {
						const embed = new Discord.MessageEmbed()
							.setColor('RED')
							.setDescription('Sorry, the player\'s discord you provided does not match yours.')
							.setAuthor('Verification Error', 'https://image.flaticon.com/icons/png/512/594/594969.png');

						const msg = await message.channel.send(embed);
						return msg.delete({ timeout: 7500 });
					}
				} else {
					const embed = new Discord.MessageEmbed()
						.setColor('RED')
						.setDescription('Sorry, the player you have provided does not have a linked discord.')
						.setAuthor('Verification Error', 'https://image.flaticon.com/icons/png/512/594/594969.png');

					const msg = await message.channel.send(embed);
					return msg.delete({ timeout: 7500 });
				}
			} else {
				const embed = new Discord.MessageEmbed()
					.setColor('RED')
					.setDescription('Sorry, the player you have provided does not have a linked discord.')
					.setAuthor('Verification Error', 'https://image.flaticon.com/icons/png/512/594/594969.png');

				const msg = await message.channel.send(embed);
				return msg.delete({ timeout: 7500 });
			}
		} else {
			const embed = new Discord.MessageEmbed()
				.setColor('RED')
				.setDescription('Sorry, the player you have provided has never joined Hypixel.')
				.setAuthor('Verification Error', 'https://image.flaticon.com/icons/png/512/594/594969.png');

			const msg = await message.channel.send(embed);
			return msg.delete({ timeout: 7500 });
		}

		// const msg = await message.channel.send('Not a real player or one who hasnt joined hypixel before / in a long time');
		// return msg.delete({ timeout: 7500 });

	},
};