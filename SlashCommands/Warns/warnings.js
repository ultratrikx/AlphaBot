const warnModel = require('../../models/warnModel')
const moment = require('moment')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'warnings',
    description: 'display a users warnings',
    options: [
        {
            name: 'target',
            description: 'user you want to warnings for',
            type: 'USER',
            required: true,
        },
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('target')
        const userWarnings = await warnModel.find({
            userId: user.id,
            guildId: interaction.guildId
        })

        if(!userWarnings?.length) return interaction.followUp({content: `${user} has no warnings in the server`})

        const embedDescription = userWarnings.map((warn) =>{
            const moderator = interaction.guild.members.cache.get(
                warn.moderatorId
            );

            return [
                `warnId: ${warn._id}`,
                `Moderator: ${moderator || 'has left'}`,
                `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
                `Reason: ${warn.reason}`,
            ].join("\n")
        }).join("\n\n")

        const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s warnings'`)
            .setDescription(embedDescription)
            .setColor("RANDOM")

        interaction.followUp({embeds: [embed]})

    },
}