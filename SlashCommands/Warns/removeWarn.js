const warnModel = require('../../models/warnModel')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {
    ...new SlashCommandBuilder()
        .setName('remove-warn')
        .setDescription('removes a user\s warning')
        .addStringOption(option => 
            option
                .setName('warnid')
                .setDescription('warnId of the warning to be remove')
                .setRequired(true)
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction, args) => {
        const warnId = interaction.options.getString('warnid')
        const data = await warnModel.findById(warnId)

        if(!data) 
            return interaction.followUp({
                content: `warn id is not valid`
            })
        data.delete();

        const user = interaction.guild.members.cache.get(data.userId)
        return interaction.followUp({content: `removed 1 of ${user}'s warnings`})

    },
}