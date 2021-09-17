const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "User Info",
    type: "USER",

    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = await client.users.fetch(interaction.targetId)
        const embed = new MessageEmbed()
            .setAuthor(user.tag)
            .setImage(user.displayAvatarURL({dynamic: true}))
        interaction.followUp({ content: `${user.tag}'s data`, embeds: [embed]})
    },
};