const { SlashCommandBuilder } = require('@discordjs/builders')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
        .setName('colour')
        .setDescription('get a colour of your choice')
        .addStringOption(option => 
            option
                .setName('colour')
                .setDescription('enter a hexcode with # for the colour')
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let hexcode = interaction.options.getString('colour')

        interaction.guild.roles.create({
        data: {
            name: hexcode,
            color: hexcode,
        }
        }).catch(console.error).then(role => {
            interaction.user.addRole(role)
        })

    },
};