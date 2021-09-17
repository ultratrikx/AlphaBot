
module.exports = {
    name: 'unban',
    description: 'unbans a user',
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: 'userid',
            description: 'The ID of the user you want to unban',
            type: 'STRING',
            required: true,
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * 
     */
    run: async (client, interaction) => {
        const userId = interaction.options.getString('userid');
        interaction.guild.members.unban(userId).then(user => {
            interaction.followUp({ content: `${user.tag} is unbanned from ${interaction.guild.name}`})
        })
        .catch(()=>{
            interaction.followUp({ content: 'the user id does not exist or the user is not currently banned from the server'},)
        });

    },
};
