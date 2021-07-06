module.exports = (Discord, client, guildMember) => {
    let welcomeRole = guildMember.guild.roles.cache.find(
        (role) => role.name === 'Member',
    );

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache
        .find((channel) => channel.name == '✌🏼-general')
        .send(`🎉 Welcome <@${guildMember.user.id}>`);
};
//TODO not make it die when some joibs other server
