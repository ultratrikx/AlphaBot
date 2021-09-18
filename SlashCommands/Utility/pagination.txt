const { SlashCommandBuilder } = require('@discordjs/builders')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const {pagination} = require('reconlx')
module.exports = {
    ...new SlashCommandBuilder()
        .setName('pagination')
        .setDescription('ENTER DESCRIPTION HERE'),
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
        const embed1 = new MessageEmbed().setTitle('1')
        const embed2 = new MessageEmbed().setTitle('2')
        const embed3 = new MessageEmbed().setTitle('3')
        const embed4 = new MessageEmbed().setTitle('4')
        const embed5 = new MessageEmbed().setTitle('5')
        const embed6 = new MessageEmbed().setTitle('6')
        const embed7 = new MessageEmbed().setTitle('7')
        const embed8 = new MessageEmbed().setTitle('8')

        const embeds = [embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8];

        pagination({
            embeds: embeds,
            channel: interaction.channel,
            author: interaction.user,
            fastSkip: true,
            pageTravel: true,
        });
    },
};