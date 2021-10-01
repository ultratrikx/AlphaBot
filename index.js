const { Client, Collection, Presence } = require("discord.js");
//const token = require("./config/config.json")
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
            name: '', // The message shown
            type: 'WATCHING', // PLAYING, WATCHING, LISTENING, STREAMING,
        },
    });
});

client.login(process.env.ALPHABOT_DJS_TOKEN);