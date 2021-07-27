module.exports = async (client, bot) => {
	console.log(`Logged in successfully using account ${client.user.tag} (${client.user.id})`);
	try {
		await client.guilds.cache.get(client.get('guildID')).channels.cache.get(client.get('partyVCChannel')).join();
	}
	catch(e) {
		return { success: false, error: e };
	}

	await client.user.setActivity('on Hypixel', {
		type: 'PLAYING',
	});
};