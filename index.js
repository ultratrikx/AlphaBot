const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config/config.json");


    const { GiveawaysManager } = require('discord-giveaways');
    client.giveawaysManager = new GiveawaysManager(client, {
        storage: './giveaways.json',
        updateCountdownEvery: 5000,
        default: {
            botsCanWin: false,
            embedColor: '#ff8cff',
            reaction: '🎉',
        },
    });

// Initializing the project
require("./handler")(client);

client.login(client.config.token);