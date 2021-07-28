/* eslint-disable no-prototype-builtins */
module.exports = {
	prefix: 'gm!',
	version: '1.0.0',
	client: {
		clientid: '868983515478372372',
		publickey: 'f7f721ef8a4c29a70b363b0fd2f40cc1a3e3e470dee0bf64f31a0497e8a35051',
		clientsecret: 'nope-not-today',
		token: 'nope-not-today',
		admininvite: 'https://discord.com/api/oauth2/authorize?client_id=868983515478372372&permissions=8&scope=bot',
	},
	guild: {
		guildID: '868965812189429771',
		invite: 'discord.gg/8d9d3gAf86',
	},
	categories: {
		textChannelsCategory: '868965812189429772',
		partyVCCategory: '868965812189429773',
	},
	channels: {
		announcementChannel: '868988854877683712',
		welcomeChannel: '868986575684517898',
		rulesChannel: '868986590666555444',
		linkingChannel: '869347768559341568',
		generalChannel: '868986841431420969',
		logsChannel: '868965812189429774',
		partyVCChannel: '868965812189429775',
		gamesChannel: '869367185787744256',
	},
	roles: {
		gmRole: '868983952982020118',
		staffRole: '868986898553647204',
		verifiedRole: '868986960889389146',
	},
	emojis: {
		pgmEmoji: '869568341981954048',
		blankEmoji: '869967072866762843',
		yesEmoji: '870072831562641461',
		noEmoji: '870072831831064596',
		warningEmoji: '870073728833318982',
		plusEmoji: '870073728401281045',
	},
	/**
     * @param {string} variable The variable you want the grab
     **/
	get(variable) {
		for (const x in module.exports) {
			if (module.exports.hasOwnProperty(x)) {
				if (x === variable) return module.exports[x];
				for (const xx in module.exports[x]) {
					if (module.exports[x].hasOwnProperty(xx)) {
						if (xx === variable) return module.exports[x][xx];
						for (const xxx in module.exports[x][xx]) {
							if (module.exports[x][xx].hasOwnProperty(xxx)) {
								if (xxx === variable) return module.exports[x][xx][xxx];
							}
						}
					}
				}
			}
		}
	},
};