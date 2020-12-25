const Discord = require ('discord.js');

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '.';

const fs = require ('fs');

const { token } = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('AlphaBot is online!');

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "ping",
            description: "Shows bot's ping"
        }
    });

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "help",
            description: "Shows a list of all commands for AlphaBot"
        }
    });

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if(command == 'ping') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 3,
                    data: {
                        content: `hi there, now shut up\n`
                            + `anyways, heres the ping; 🏓 ${Math.round(client.ws.ping)} ms`
                    }
                }
            });
        }

        if(command == 'help') {
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .setAuthor('Alpha Bot#0038', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
            .setDescription('Here’s the list of commands!\n\n'
                + '**Normal Commands**\n'
                + 'type `.ping` to get rudely insulted\n'
                + 'type `.hi` to get haunted\n'
                + 'type `.babykata2` for meme\n'
                + 'type `.weather [location]` for weather of said location\n'
                + 'type `.covid [country]` for info about their covid cases\n'
                + 'type `.math [math equation]` for calculation\n'
                + 'type `.meme` for a meme (they may contain swearing)\n'
                + 'type `.botinfo` for information about the bot\n\n'
                + '**Admin Commands**\n'
                + 'type `.clear [number]` to clear messages\n'
                + 'type `.mute [@user] [number]m or s` to timed mute mentioned user \n'
                + 'type `.unmute [@user]` to manually unmute the mentioned user\n '
                + 'type `.kick [@user]` to kick mentioned user\n'
                + 'type `.ban [@user]` to punish someone who says trans right aren‘t human rights\n\n'
                + '**Colour Role Commands**\n'
                + 'type `.redrole` to get a red colour on your name\n'
                + 'type `.blues` to get the blue colour on you name\n'
                + 'type `.grebn` to become shrek\n'
                + 'type `.pruple` to become pruple\n'
                + 'type `.rameningscolour` to cause confuse\n'
                + 'type `.admincolour` to get the black admin colour (only for admins you idiot)\n'
                + 'type `.boostercolour` to get the booster pink colour (boost this server to unlock this)')
    
                
            .setFooter('Made by nf#0001 in partnership with ultratrikx#1056 and Alpha Bot#0038');

            
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, embed)
                }
            });
        }

    });

    client.user.setPresence({
        status: "dnd",  //You can show online, idle... Do not disturb is dnd
        
        activity: {
            name: "the winter break",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
});

async function createAPIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return { ...apiMessage.data, files: apiMessage.files };
}

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('657402007925030925').send(`🎉 Welcome <@${guildMember.user.id}> <:smrik:771347389055107102> lol`)
})

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot)return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);

    } else if (command == 'hi'){
        client.commands.get('hi').execute(message, args);

    } else if (command == 'help'){
        client.commands.get('help').execute(message, args, Discord);

    }else if (command == 'babykata2'){
        client.commands.get('babykata2').execute(message, args);

    }else if (command == 'redrole'){
        client.commands.get('redrole').execute(message, args);

    }else if (command == 'blues'){
        client.commands.get('blues').execute(message, args);

    }else if (command == 'grebn'){
        client.commands.get('grebn').execute(message, args);

    }else if (command == 'rameningscolour'){
        client.commands.get('rameningscolour').execute(message, args);

    }else if(command == 'pruple'){
        client.commands.get('pruple').execute(message, args);

    }else if(command == 'admincolour'){
        client.commands.get('admincolour').execute(message, args);

    }else if(command == 'boostercolour'){
        client.commands.get('boostercolour').execute(message, args);

    }else if(command == 'reactionrole'){
        client.commands.get('reactionrole').execute(message, args, Discord, client);

    }else if(command == 'pronounroles'){
        client.commands.get('pronounroles').execute(message, args, Discord, client);

    }else if (command == 'clear'){
        client.commands.get('clear').execute(message,args);

    }else if(command == 'botinfo'){
        client.commands.get('botinfo').execute(message, args, Discord);

    }else if(command == 'kick'){
        client.commands.get('kick').execute(message, args);

    }else if(command == 'ban'){
        client.commands.get('ban').execute(message, args);

    }else if(command == 'mute'){
        client.commands.get('mute').execute(message, args);

    }else if(command == 'unmute'){
        client.commands.get('unmute').execute(message, args);

    }else if(command == 'weather'){
        client.commands.get('weather').execute(client, message, args);

    }else if(command == 'covid'){
        client.commands.get('covid').execute(client, message, args);

    }else if(command == 'math'){
        client.commands.get('math').execute(client, message, args);

    }else if(command == 'meme'){
        client.commands.get('meme').execute(client, message, args);

    }else if(command == 'deaf'){
        client.commands.get('deaf').execute(message, args);

    }else if(command == 'undeaf'){
        client.commands.get('undeaf').execute(message, args);

    }else if(command == 'mutes'){
        client.commands.get('mutes').execute(message, args);

    }else if(command == 'unmutes'){
        client.commands.get('unmutes').execute(message, args);

    }
});


//client.login(process.env.ALPHABOT_DJS_TOKEN)
client.login(token)