const Discord = require ('discord.js');

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '.';

const fs = require ('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('AlphaBot is online!');
    client.user.setPresence({
        status: "dnd",  //You can show online, idle... Do not disturb is dnd
        
        activity: {
            name: "the winter break",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
});

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

    }
});


client.login("NzAyNTE0Nzg4MzQwODU4ODky.XqBJ4Q.sm1IH_kt4w4tEIZ7nwcxwwhJnYo")