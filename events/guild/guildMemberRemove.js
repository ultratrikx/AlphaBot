module.exports = (Discord, client, guildMember) => {
    guildMember.guild.channels.cache
        .find((channel) => channel.name == '✌🏼-general')
        .send(`<@${guildMember.user.id}> just left the server.`);
};
//TODO not make it die when someone leaves in other server