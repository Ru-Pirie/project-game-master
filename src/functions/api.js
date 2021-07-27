const fetch = require('node-fetch');

module.exports = {
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
			return data;
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
		const data = await res.json();
        return data;
    },
};