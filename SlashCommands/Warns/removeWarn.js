const warnModel = require('../../models/warnModel')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'remove-warn',
    description: 'remove a user\s warnings',
    userPermissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'warnid',
            description: 'warnId you want to delete',
            type: STRING,
            required: true,
        },
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction, args) => {
        const warnId = interaction.options.getString('warnid')
        const data = await warnModel.findById(warnId)

        if(!data) return interaction.followUp({content: `warn id is not valid`})

        const user = interaction.guild.members.cache.get(data.userId)
        return interaction.followUp({content: `removed 1 of ${user}'s warnings`})

    },
}