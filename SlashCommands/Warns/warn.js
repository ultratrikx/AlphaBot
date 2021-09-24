const warnModel = require('../../models/warnModel')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'warn',
    description: 'warns a user',
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: 'target',
            description: 'user you want to warn',
            type: 'USER',
            required: true,
        },
        {
            name: "reason",
            description: 'reason for the warn',
            type: 'STRING',
            required: true,
        }
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason')

        new warnModel({
            userId: user.id,
            guildId: guild.id,
            moderatorId: interaction.user.id,
            reason,
            timestamp: Date.now(),
        }).save();

        user.send(`you have been warned in ${interaction.guild.name} for ${reason}`).catch(console.log)
        interaction.followUp({content: `${user} has been warned for ${reason}`})
    },
}