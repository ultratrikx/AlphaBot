const { SlashCommandBuilder } = require('@discordjs/builders')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
        .setName('help-me')
        .setDescription('helps you'),
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
        interaction.followUp({ content: 'skill issue, pathetic'})
    },
};