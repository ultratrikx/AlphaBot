const { Client, CommandInteraction, MessageEmbed, version } = require("discord.js");

module.exports = {
    name: "botinfo",
    description: "gives info about me",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
          const infoembed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Bot Info')
            .setAuthor(
                'Alpha Bot#0038',
                'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024',
            )
            .setDescription(
                'Here’s more Info About Me! (so you can hack me and do illegal things)\n\n' +
                    '**Name** = AlphaBot\n' +
                    `**Version** = 3.00\n` +
                    '**Description** = this is bot, do things with bot, do `.help` for help (with bot obv)\n' +
                    '**Code Language** = JavaScript(.js) with the Node.js Framework\n' +
                    `**Discord.js Version** = ${version}\n` +
                    '**Bot User** = Alpha Bot#0038\n' +
                    '**Bot Owner** = ultratrikx#2605\n' +
                    /* **Bot Token** = ||<a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200><a:rollrick:795716484068147200>||\n' +*/
                    '**Github** = https://github.com/ultratrikx/AlphaBot \n\n' +
                    'Hosted on Heroku',
            )

            .setFooter('Made by ultratrikx#2605 and Alpha Bot#0038');

        interaction.followUp({ embeds: [infoembed]});

    },
};