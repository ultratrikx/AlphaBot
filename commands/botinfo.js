const { version } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'botinfo, to rip me off',
    execute(client, message, args, Discord) {
        const infoembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Bot Info')
            .setAuthor(
                'Alpha Bot#0038',
                'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024',
            )
            .setDescription(
                'Here’s more Info About Me! (so you can hack me and do illegal things)\n\n' +
                    '**Name** = AlphaBot\n' +
                    `**Version** = 1.5.9\n` +
                    '**Description** = this is bot, do things with bot, do `.help` for help (with bot obv)\n' +
                    '**Code Language** = JavaScript(.js) and JavaScript Object Notation(.JSON)\n' +
                    `**Discord.js Version** = ${version}\n` +
                    '**Bot User** = Alpha Bot#0038\n' +
                    '**Bot Owner** = ultratrikx#1056\n' +
                    //s + '**Bot Token** = ||<a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200>||\n'
                    '**Github** = https://github.com/ultratrikx/AlphaBot \n\n' +
                    'Hosted on Heroku',
            )

            .setFooter('Made by ultratrikx#2605 and Alpha Bot#0038');

        message.channel.send(infoembed);
    },
};
