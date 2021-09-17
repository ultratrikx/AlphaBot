
module.exports = {
    name: 'kick',
    description: 'kicks a member',
    userPermissions: ["KICK_MEMBERS"],
    options: [
        {
            name: 'target',
            description: 'member to kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for the kick',
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
        return interaction.followUp({content: 'you cannot kick someone in a higher role than you'})

        await target.send(`You have been kicked from ${interaction.guild.name}, reason: ${reason}`)

        target.kick(reason)

        interaction.followUp({content: `Kicked ${target.user.tag}. Reason: ${reason}`})
    },
};