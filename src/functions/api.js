const fetch = require('node-fetch');

module.exports = {
	raw: async function(query, key, value) {
		const res = await fetch(`https://api.hypixel.net/${query}?key=${process.env.API_KEY}&${key}=${value}`);
		const data = await res.json();
		if (!data.success || (data.success && data.player === null) || (data.success && data.guild === null)) {
			return { success: false, error: 'API Call Error' };
		}
		else {
			return data;
		}
	},
};