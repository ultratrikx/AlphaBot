

module.exports = {
    name: 'ban',
    description: 'bans a member',
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: 'target',
            description: 'member to ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for the ban',
            type: 'STRING',
            required: false,
        },
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const target = interaction.options.getMember('target')
        const reason = interaction.options.getString('reason') || "No reason provided"
        
        if (target.roles.highest.position >= 
            interaction.member.roles.highest.position)
        return interaction.followUp({content: 'you cannot ban someone in a higher role than you'})

        await target.send(`You have been banned from ${interaction.guild.name}, reason: ${reason}`)

        target.ban({reason: reason})

        interaction.followUp({content: `Banned ${target.user.tag}. Reason: ${reason}`})
    },
};