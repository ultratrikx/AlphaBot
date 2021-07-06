const Discord = require('discord.js');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
// ! REMEMBER TO COMMENT OUT THIS FILE WHEN RUNNING
//const { token } = require('./security/config.json');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
});
//*---------------------------------------------------------------
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

client.giveawaysManager.on(
    'giveawayReactionAdded',
    (giveaway, member, reaction) => {
        console.log(
            `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`,
        );
    },
);

client.giveawaysManager.on(
    'giveawayReactionRemoved',
    (giveaway, member, reaction) => {
        console.log(
            `${member.user.tag} unreacted to giveaway #${giveaway.messageID} (${reaction.emoji.name})`,
        );
    },
);
//*---------------------------------------------------------------
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
//client.login(token);
// ! REMEMBER TO COMMENT OUT THE LINE ABOVE BEFORE RUNNING
