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

client.once('ready', () => {
    console.log('RPC Set');
    client.user.setPresence({
        status: 'dnd', //You can show online, idle... Do not disturb is dnd

        activity: {
            name: '.help', // The message shown
            type: 'LISTENING', // PLAYING, WATCHING, LISTENING, STREAMING,
        },
    });
});

client.login(process.env.ALPHABOT_DJS_TOKEN);