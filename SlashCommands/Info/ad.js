const { SlashCommandBuilder } = require('@discordjs/builders')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
        .setName('raghav_for_pm')
        .setDescription('find out more about Raghav Singh\'s promises for the school'),
        // .addStringOption(option => 
        //     option
        //         .setName('NAME')
        //         .setDescription('DESCRIPTION')),


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: 'https://cdn.discordapp.com/attachments/856543669938946048/895058206617911306/unnamed.gif'})
    },
};
