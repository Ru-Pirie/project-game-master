const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { get } = require('../../config');

module.exports = {
	/**
     * @param {object} game The object of the game which has been selected
     * @param {object} message The object of the message of teh request
     *
     * @returns {boolean} true if successfully false if not
    **/
	gameRequestEmbed: async function(game, message) {
		const embed = new Discord.MessageEmbed()
			.setTitle('Game Added to Queue')
			.setColor('GREEN')
			.setDescription(`${game.name} - ${game.description}`)
			.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/Arcade-64.png')
			.addFields(
				{ name: 'Requested By:', value: message.author, inline: false },
				{ name: 'Game:', value: game.name, inline: false },
				{ name: 'Max Players:', value: game.max, inline: false },
			)
			.setTimestamp();

		try {
			await message.guild.channels.cache.get(get('gamesChannel')).send({ embed: embed });
			return { success: true };
		}
		catch(e) {
			return { success: false, error: e };
		}
	},
	gameSelectEmbed: async function(match, top5) {

		const others = [];

		for (let i = 0; i < 5; i++) {
			others.push(`**${i + 1}.** ${top5[i].name} - Match: ${Math.round(top5[i].match * 100)}%`);
		}


		const embed = new Discord.MessageEmbed()
			.setColor('RED')
			.setTitle('Hypixel Game Search')
			.setDescription(`I have found this result that best matches your original query. If its correct click the green button if not and you want another one as stated in other matches click the blue one otherwise click cancel!${match.description}`)
			.setThumbnail('https://www.clipartmax.com/png/full/172-1723116_wrapkit-%E2%80%9C-magnifying-glass-icon-png.png')
			.addFields(
				{ name: 'Best Match:', value: `Name: ${match.name}\nMatch: ${Math.round(match.match * 100)}%` },
				{ name: 'Other Matches:', value: `${others.join('\n')}` },
			);

		return embed;
	},
	loginEmbed: async function(client, bot, channel) {
		const query = await client.apiFetch.rawHypixel('key');
		const embed = new Discord.MessageEmbed()
			.setColor('GREEN')
			.setTitle('Bot has Initialized!')
			.setDescription('The bot has initialized into minecraft and discord. Please find the details below. All information below is to be considered confidential.')
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Instance Time:', value: `${client.uptime / 1000} seconds`, inline: true },
				{ name: 'Discord Socket Ping:', value: `${client.ws.ping}ms`, inline: true },
				{ name: 'Minecraft Server Ping:', value: `${bot.player.ping}ms`, inline: true },
				{ name: 'Server:', value: `\`${process.env.BOT_HOST}:${process.env.BOT_PORT}\``, inline: true },
				{ name: 'Bot Username:', value: `${bot.player.username}`, inline: true },
				{ name: 'Bot Version:', value: `${process.env.BOT_VERSION}`, inline: true },
				{ name: 'Total API Calls:', value: `${query.record.totalQueries}`, inline: true },
				{ name: 'API Key Owner:', value: `\`${query.record.owner}\``, inline: true },
				{ name: 'API Queries:', value: `${query.record.queriesInPastMin}/${query.record.limit}`, inline: true },
			)
			.setTimestamp()
			.setFooter('Project Game Master', client.user.displayAvatarURL({ dynamic: true }));


		try {
			await channel.send(embed);
			return { success: true };
		}
		catch(e) {
			return { success: false, error: e };
		}
	},
};