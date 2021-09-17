const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const figlet = require('figlet');
module.exports = {
    ...new SlashCommandBuilder()
        .setName('bigword')
        .setDescription('makes your content big')
        .addStringOption(option => 
            option
                .setName('message')
                .setDescription('message you enlarge')
                .setRequired(true)
                ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        if (!args[0])
            return interaction.followUp({ content: 'Please provide some text' });

        const msg = interaction.options.getString('message')

        figlet.text(msg, function (err, data) {
            if (err) {
                console.log('Something went wrong');
                console.dir(err);
            }
            if (data.length > 2000)
                return message.channel.send(
                    'Please provide text shorter than 2000 characters',
                );

            interaction.followUp({ content: '```' + data + '```' });
        });
    },
};
