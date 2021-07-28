const Discord = require('discord.js');

module.exports = {
	name: 'accountlinkembed',
	description: 'Send account link embed',
	usage: 'accountLinkEmbed',
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
		const embed = new Discord.MessageEmbed()
			.setColor('LUMINOUS_VIVID_PINK')
			.setTitle('Link Your Minecraft Account')
			.setThumbnail('https://hypixel.net/styles/hypixel-v2/images/game-icons/Arcade-64.png')
			.setDescription(`In order for you to access the rest of the server and use the party system you must link your Minecraft and Discord accounts together. There are some steps below which should help you to link your account and gain access. By linking your account you agree to follow our rules and TOS, you can see these in <#${client.get('rulesChannel')}> apart from that have fun and stay safe!\n<:blank:869967072866762843>`)
			.addField('Why should I?', 'It allows us to to interact with the Hypixel and Mojang API to make this whole system work. None of your personal data is stored or collected just you UUID of your minecraft player. The linking process will have no impact on you in this server in any way nor on Hypixel.\n<:blank:869967072866762843>')
			.addField('How to verify:', `:one: Login to \`mc.hypixel.net\` on 1.8.9 or above\n:two: Run the \`/profile\` command in a lobby\n:three: Click on the Social Media button\n:four: Post your discord username in hypixel chat\n:five: Post only your minecraft username in this channel\n<:blank:869967072866762843>\n<:pgm:869568341981954048> Questions? DM a <@&${client.get('staffRole')}> Member`)
			.setImage('https://i.imgur.com/RI40eDR.gif');

		message.channel.send({ embed: embed });
	},
};