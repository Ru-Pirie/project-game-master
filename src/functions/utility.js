const blob = require('../../games_blob.json');
const Similarity = require('string-similarity');

function levelDistribution(s, t) {
	const d = [];
	// 2d matrix

	// Step 1
	const n = s.length;
	const m = t.length;

	if (n == 0) return m;
	if (m == 0) return n;

	// Create an array of arrays in javascript (a descending loop is quicker)
	for (let i = n; i >= 0; i--) d[i] = [];

	// Step 2
	for (let i = n; i >= 0; i--) d[i][0] = i;
	for (let j = m; j >= 0; j--) d[0][j] = j;

	// Step 3
	for (let i = 1; i <= n; i++) {
		const s_i = s.charAt(i - 1);

		// Step 4
		for (let j = 1; j <= m; j++) {

			// Check the jagged ld total so far
			if (i == j && d[i][j] > 4) return n;

			const t_j = t.charAt(j - 1);
			const cost = (s_i == t_j) ? 0 : 1;
			// Step 5

			// Calculate the minimum
			let mi = d[i - 1][j] + 1;
			const b = d[i][j - 1] + 1;
			const c = d[i - 1][j - 1] + cost;

			if (b < mi) mi = b;
			if (c < mi) mi = c;

			d[i][j] = mi;
			// Step 6

			// Damerau transposition
			if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
				d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
			}
		}
	}

	// Step 7
	return d[n][m];
}

module.exports = {
	getGameCommand: function(gameName) {
		const find = blob.games.find(entry => entry.command === gameName);
		return find;
	},
	getGameName: function(gameName) {
		const find = blob.games.find(entry => entry.name.toLowerCase() === gameName.toLowerCase());
		return find;
	},
	lookup(search) {
		if (Array.isArray(blob.games) && blob.games.length >= 1) {
			const grabCommands = blob.games.map(v => {
				return v.name.toLowerCase();
			}).filter(v => {
				return v !== null;
			});

			const commandArray = grabCommands.sort((a, b) => {
				return levelDistribution(a, search) - levelDistribution(b, search);
			});

			const matches = Similarity.findBestMatch(search, grabCommands);

			matches.ratings = matches.ratings.sort((a, b) => {
				return b.rating - a.rating;
			});

			return matches;
		}
		else {
			return { success: false, error: 'No results found', result: [], size: 0 };
		}

	},
};