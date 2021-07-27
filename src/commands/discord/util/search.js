const { lookup } = require('../../../functions/utility');
const disbut = require('discord-buttons');

module.exports = {
	name: 'search',
	description: 'Search for a hypixel game and be given the closest match',
	usage: 'search [game]',
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
		let result = lookup(args.join(' ').toLowerCase());

		const match = client.getGameName(result.bestMatch.target);
		match.match = result.bestMatch.rating;

		result = result.ratings;
		const top5 = [];

		for (let i = 1; i < 6; i++) {
			const tempObject = client.getGameName(result[i].target);
			tempObject.match = result[i].rating;
			top5.push(tempObject);
		}

		const embed = await client.embed.gameSelectEmbed(match, top5);

		const confirm = new disbut.MessageButton()
			.setLabel('Confirm')
			.setEmoji('✅')
			.setID('confirm')
			.setStyle('green');

		const other = new disbut.MessageButton()
			.setLabel('Select Other')
			.setEmoji('↕️')
			.setID('select')
			.setStyle('blurple');

		const cancel = new disbut.MessageButton()
			.setLabel('Cancel')
			.setEmoji('❌')
			.setID('cancel')
			.setStyle('red');


		const MessageMenu = {
			type: 3,
			placeholder: 'Select your alternate game...',
			max_values: undefined,
			min_values: undefined,
			custom_id: 'gameMenu',
		};

		const options = [];

		for (const entry of top5) {
			options.push({
				label: entry.name,
				value: entry.command,
				default: undefined,
				emoji: undefined,
				description: `Match: ${Math.round(entry.match * 100)}%`,
			});
		}

		MessageMenu.options = options;

		const row1 = new disbut.MessageActionRow()
			.addComponent(MessageMenu);

		const row2 = new disbut.MessageActionRow()
			.addComponent(confirm)
			.addComponent(other)
			.addComponent(cancel);

		const menuFilter = (element) => element.clicker.user.id === message.author.id;

		const msg = await message.channel.send({ components: [row2], embed: embed });

		await msg.awaitButtons(menuFilter, { max: 1, time: 30000, errors: ['time'] })
			.then(async collected => {
				if (collected.first().id === 'confirm') {
					await msg.delete()
					client.embed.gameRequestEmbed(match, message)
				}
				else if (collected.first().id === 'select') {
					await msg.edit({ components: [row1], embed: embed });
					msg.awaitMenus(menuFilter, { max: 1, time: 30000, errors: ['time'] })
						.then(async entry => {
							await msg.delete()
							const game = client.getGameCommand(entry.first().values[0])
							client.embed.gameRequestEmbed(game, message)
						})
						.catch(() => {
							msg.delete();
						});
				}
				else {
					message.delete();
					msg.delete();
				}
			})
			.catch(() => {
				msg.delete();
			});
	},
};