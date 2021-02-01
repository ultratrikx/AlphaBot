const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'the all in one help command for help',
    async execute(client, message, args, Discord) {
        const mainpage = new Discord.MessageEmbed()
            .setColor('#db0000')
            .setTitle('Commands Help')
            .setThumbnail(
                'https://cdn.discordapp.com/attachments/764586697437741088/804858933373042698/Alpha2021.png',
                //'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024',
            )
            .setAuthor('Alpha Bot Commands Help')
            .setDescription(
                "Simply scroll through pages using the reaction emoji's below",
            )
            .setTimestamp();

        const utility = new Discord.MessageEmbed()
            .setColor('#6b81ff')
            .setTitle('Utility Commands Help')
            .setAuthor('Alpha Bot Commands Help')
            .setDescription('Just some random stuff')
            .addField(
                '`.weather [location]`',
                'for weather of said location',
            )
            .addField(
                '`.covid [country, all]`',
                'info about their covid cases',
            )
            .addField('`.math [math equation]`', 'math calculation')
            .addField(
                '`.news [query]`',
                'search up news atricles by name',
            )
            .addField('`.botinfo`', 'information about the bot')
            .addField('`.ping`', 'to get lag info')
            .setTimestamp();

        const fun = new Discord.MessageEmbed()
            .setColor('#e5ff00')
            .setTitle('Fun Commands Help')
            .setAuthor('Alpha Bot Commands Help')
            .setDescription('Fun Commands stuff')
            .addField('`.bigword`', 'makes your text big')
            .addField(
                '`.nba`',
                "check out the scores for today's games",
            )
            .addField(
                '`.nbagame [gameid]`',
                'check the specific score for a game today',
            )
            .addField(
                '`.giveaway #channel [duration] [number of winners] [prize]`',
                'host a giveaway',
            )
            .addField(
                '`.reroll [message ID of giveaway]`',
                ' reroll the winners of a giveaway',
            )
            .addField(
                '`.endgiveaway [message ID of giveaway]`',
                'end a giveaway early',
            )
            .setTimestamp();

        const pages = [mainpage, utility, fun];
        const emojilist = ['⏪', '⏩'];
        const timeout = '120000';

        pagination(message, pages, emojilist, timeout);
    },
};
