const fetch = require('node-fetch');

module.exports = {
	/**
     * I pray for you if your using this
     *
     * @param {string} query The query you wish to makes
     * @param {string} key Key to add to query
     * @param {string} value Value of the key to query
     *
     * @return {object} Should return the json result of the query
    **/
	rawHypixel: async function(query, key, value) {
		const res = await fetch(`https://api.hypixel.net/${query}?key=${process.env.API_KEY}&${key}=${value}`);
		const data = await res.json();
		if (!data.success || (data.success && data.player === null) || (data.success && data.guild === null)) {
			return { success: false, error: 'API Call Error' };
		}
		else {
			return data;
		}
	},
	playerSocials: async function(uuid) {
		const res = await fetch(`https://api.hypixel.net/player?key=${process.env.API_KEY}&uuid=${uuid}`);
		const data = await res.json();
		if (!data.success || (data.success && data.player === null) || (data.success && data.guild === null)) {
			return { success: false, error: 'API Call Error' };
		}
		else {
			return data.player.socialMedia;
		}
	},
	/**
     * I pray for you if your using this
     *
     * @param {string} query The query you wish to makes
     *
     * @return {object} Should return the json result of the query
    **/
	rawMojang: async function(query) {
		const res = await fetch(`https://api.mojang.com/${query}`);
		const { status } = res;
		if (status !== 200) return { success: false, error: 'API Call Error' };
		const data = await res.json();
		return data;
	},
};