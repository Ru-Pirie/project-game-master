const Discord = require('discord.js');
const { get } = require('../../config');

module.exports = {
	/**
     * @param {object} game The object of the game which has been selected
     * @param {object} channel The object of the channel to send the embed too
     *
     * @returns {boolean} true if successfully false if not
    **/
	gameEmbed: async function(game, channel) {
		const embed = new Discord.MessageEmbed()
			.set;

		try {
			await channel.send({ embed: embed });
			return { success: true };
		}
		catch(e) {
			return { success: false, error: e };
		}
	},
	loginEmbed: async function(client, bot, channel) {
        const query = await client.hypixel.raw('key')
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