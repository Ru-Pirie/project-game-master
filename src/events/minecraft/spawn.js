const { loginEmbed } = require('../../functions/embed');
const Discord = require('discord.js');

module.exports = async (client, bot) => {
	const logWebhook = new Discord.WebhookClient(process.env.HOOK_ID, process.env.HOOK_TOKEN);
	loginEmbed(client, bot, logWebhook);
};