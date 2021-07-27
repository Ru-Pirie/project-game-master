require('dotenv').config();

const { getGame } = require('./src/functions/utility');

const api = require('./src/functions/api');
const blob = require('./games_blob.json');
const config = require('./config');
const mineflayer = require('mineflayer');
const mineflayerViewer = require('prismarine-viewer').mineflayer;
const fetch = require('node-fetch');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();
client.mcCommands = new Discord.Collection();

const bot = mineflayer.createBot({
	host: process.env.BOT_HOST,
	port: parseInt(process.env.BOT_PORT),
	username: process.env.BOT_USERNAME,
	password: process.env.BOT_PASSWORD,
	version: process.env.BOT_VERSION,
});

bot.once('spawn', () => {
	mineflayerViewer(bot, { port: 3007, firstPerson: false });
	console.log('http://localhost:3007');
});

async function main() {
	const commandFolders = fs.readdirSync('./src/commands/discord').filter(f => !f.includes('.'));
	commandFolders.forEach(folder => {
		const commandFiles = fs.readdirSync(`./src/commands/discord/${folder}`).filter(file => file.endsWith('.js'));
		commandFiles.forEach(file => {
			const command = {
				name: require(`./src/commands/discord/${folder}/${file}`).name,
				file: require(`./src/commands/discord/${folder}/${file}`),
			};
			client.commands.set(command.name, command.file);
		});
	});

	const eventFiles = fs.readdirSync('./src/events/discord').filter(f => f.split('.').pop() === 'js');
	eventFiles.forEach(file => {
		const event = {
			name: file.split('.')[0],
			file: require(`./src/events/discord/${file}`).bind(null, client, bot),
		};
		client.on(event.name, event.file);
	});

	const mcEventFiles = fs.readdirSync('./src/events/minecraft').filter(f => f.split('.').pop() === 'js');
	mcEventFiles.forEach(file => {
		const mcEvent = {
			name: file.split('.')[0],
			file: require(`./src/events/minecraft/${file}`).bind(null, client, bot),
		};
		bot.on(mcEvent.name, mcEvent.file);
	});

	const mcCommandFolders = fs.readdirSync('./src/commands/minecraft').filter(f => !f.includes('.'));
	mcCommandFolders.forEach(folder => {
		const mcCommandFiles = fs.readdirSync(`./src/commands/minecraft/${folder}`).filter(file => file.endsWith('.js'));
		mcCommandFiles.forEach(file => {
			const command = {
				name: require(`./src/commands/minecraft/${folder}/${file}`).name,
				file: require(`./src/commands/minecraft/${folder}/${file}`),
			};
			client.mcCommands.set(command.name, command.file);
		});
	});
}

main();

client.get = config.get;
client.blob = blob.games;
client.getGame = getGame;
client.hypixel = api;

client.login(process.env.TOKEN);


module.exports = client;