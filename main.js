const Discord = require('discord.js');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const prefix = '.';

const fs = require('fs');

//const { token } = require('./security/config.json');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

/*
['command_handler', 'event_handler'].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
});
*/

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
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
// We now have a client.giveawaysManager property to manage our giveaways!

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
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const commandFiles = fs
    .readdirSync('./commands/')
    .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
client.once('ready', () => {
    console.log('AlphaBot is online!');

    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'ping',
            description: "Shows the Alpha's ping",
        },
    });

    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'help',
            description: 'Shows a list of all commands for AlphaBot',
        },
    });

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command == 'ping') {
            client.api
                .interactions(interaction.id, interaction.token)
                .callback.post({
                    data: {
                        type: 3,
                        data: {
                            content:
                                `hi there, now stop pinging me\n` +
                                `either way, heres the ping; 🏓 ${Math.round(
                                    client.ws.ping,
                                )} ms`,
                        },
                    },
                });
        }

        if (command == 'help') {
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Type `.help` for more commands!')
                .setAuthor(
                    'Alpha Bot',
                    'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024',
                )
                .setDescription(
                    'Here’s a few commands to get you started\n\n' +
                        '**Normal Commands**\n' +
                        "type `.ping` to get the bot's ping\n" +
                        'type `.weather [location]` for weather of said location\n' +
                        'type `.covid [country]` for info about their covid cases\n' +
                        'type `.math [math equation]` for calculation\n' +
                        'type `.botinfo` for information about the bot\n\n' +
                        '**Colour Role Commands**\n' +
                        'type `.redrole` to get a red colour on your name\n' +
                        'type `.blues` to get the blue colour on you name\n' +
                        'type `.grebn` to become shrek\n' +
                        'type `.pruple` to become pruple\n' +
                        'type `.rameningscolour` to cause confuse\n' +
                        'type `.admincolour` to get the black admin colour (only for admins you idiot)\n' +
                        'type `.boostercolour` to get the booster pink colour (boost this server to unlock this)',
                )

                .setFooter(
                    'Made by nf#7972 in partnership with ultratrikx#2605 and Alpha Bot#0038',
                );

            client.api
                .interactions(interaction.id, interaction.token)
                .callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(
                            interaction,
                            embed,
                        ),
                    },
                });
        }
    });
    //------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------

    client.user.setPresence({
        status: 'dnd', //You can show online, idle... Do not disturb is dnd

        activity: {
            name: '.help', // The message shown
            type: 'LISTENING', // PLAYING, WATCHING, LISTENING, STREAMING,
        },
    });
});

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
async function createAPIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(
        client.channels.resolve(interaction.channel_id),
        content,
    )
        .resolveData()
        .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
}
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

client.on('guildMemberAdd', (guildMember) => {
    let welcomeRole = guildMember.guild.roles.cache.find(
        (role) => role.name === 'Member',
    );

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache
        .get('796140427878858763')
        .send(`🎉 Welcome <@${guildMember.user.id}>`);
});

client.on('guildMemberRemove', (guildMember) => {
    guildMember.guild.channels.cache
        .get('796140427878858763')
        .send(`<@${guildMember.user.id}> just left the server.`);
});

client.on('messageDelete', (message) => {
    if (!message.partial) {
        const channel = client.channels.cache.get(
            '796169627226472469',
        );
        const user = message.guild.members.cache.get(
            '636001855339495434',
        );
        if (channel) {
            const embed = new Discord.MessageEmbed()
                .setColor('#f55151')
                .setTitle('Deleted Message')
                .setThumbnail(message.author.displayAvatarURL());
            if (message.attachments.size !== 0) {
                embed.addField(
                    'Attachments',
                    `${message.attachments.first().url}`,
                );
            }
            embed
                .addField('Author', `<@${message.author.id}>`)
                .addField('Channel', `${message.channel.name}`)
                .setDescription(
                    `**Message Content:** ${message.content}`,
                )
                .setTimestamp();

            channel.send(embed);
            user.send(embed);
        }
    }
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(client, message, args);
    } else if (command == 'help') {
        client.commands
            .get('help')
            .execute(client, message, args, Discord);
    } else if (command == 'redrole') {
        client.commands.get('redrole').execute(message, args);
    } else if (command == 'blues') {
        client.commands.get('blues').execute(message, args);
    } else if (command == 'grebn') {
        client.commands.get('grebn').execute(message, args);
    } else if (command == 'rameningscolour') {
        client.commands.get('rameningscolour').execute(message, args);
    } else if (command == 'pruple') {
        client.commands.get('pruple').execute(message, args);
    } else if (command == 'admincolour') {
        client.commands.get('admincolour').execute(message, args);
    } else if (command == 'boostercolour') {
        client.commands.get('boostercolour').execute(message, args);
    } else if (command == 'reactionrole' || command == 'rr') {
        client.commands
            .get('reactionrole')
            .execute(message, args, Discord, client);
    } else if (command == 'pronounroles' || command == 'pr') {
        client.commands
            .get('pronounroles')
            .execute(message, args, Discord, client);
    } else if (command == 'clear') {
        client.commands.get('clear').execute(client, message, args);
    } else if (command == 'botinfo') {
        client.commands
            .get('botinfo')
            .execute(message, args, Discord);
    } else if (command == 'kick') {
        client.commands
            .get('kick')
            .execute(client, message, args, Discord);
    } else if (command == 'ban') {
        client.commands
            .get('ban')
            .execute(client, message, args, Discord);
    } else if (command == 'mute') {
        client.commands.get('mute').execute(message, args);
    } else if (command == 'unmute') {
        client.commands.get('unmute').execute(message, args);
    } else if (command == 'weather') {
        client.commands.get('weather').execute(client, message, args);
    } else if (
        command == 'covid' ||
        command == 'rona' ||
        command == 'corona'
    ) {
        client.commands.get('covid').execute(client, message, args);
    } else if (command == 'math') {
        client.commands.get('math').execute(client, message, args);
    } else if (command == 'deaf') {
        client.commands.get('deaf').execute(message, args);
    } else if (command == 'undeaf') {
        client.commands.get('undeaf').execute(message, args);
    } else if (command == 'mutes') {
        client.commands.get('mutes').execute(message, args);
    } else if (command == 'unmutes') {
        client.commands.get('unmutes').execute(message, args);
    } else if (command == 'giveaway') {
        client.commands
            .get('giveaway')
            .execute(client, message, args, Discord);
    } else if (command == 'reroll') {
        client.commands
            .get('reroll')
            .execute(client, message, args, Discord);
    } else if (command == 'endgiveaway' || command == 'endg') {
        client.commands
            .get('endgiveaway')
            .execute(client, message, args, Discord);
    } else if (command == 'bigword' || command == 'bw') {
        client.commands
            .get('bigword')
            .execute(client, message, args, Discord);
    } else if (command == 'remind') {
        client.commands
            .get('remind')
            .execute(client, message, args, Discord);
    } else if (command == 'timer') {
        client.commands
            .get('timer')
            .execute(client, message, args, Discord);
    } else if (command == 'funroles' || command == 'fr') {
        client.commands
            .get('funroles')
            .execute(message, args, Discord, client);
    } else if (command == 'nba') {
        client.commands
            .get('nba')
            .execute(message, args, Discord, client);
    }
});
client.login(process.env.ALPHABOT_DJS_TOKEN);
//client.login(token);
