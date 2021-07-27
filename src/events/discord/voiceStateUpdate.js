module.exports = async (client, bot, oldState, newState) => {
	if (newState.id) {
		const newMember = newState.guild.members.cache.get(newState.id);
		if (newMember.bot && newMember.id !== client.get('clientid')) {
			newMember.voice.setChannel(null);
		}
	}
};