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



// Initializing the project
require("./handler")(client);

client.login(process.env.ALPHABOT_DJS_TOKEN);