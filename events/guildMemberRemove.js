const client = require("../index");

client.on("guildMemberRemove", async (guildMember) => {
    guildMember.guild.channels.cache
        .find((channel) => channel.name == '✌🏼-general')
        .send(`<@${guildMember.user.id}> just left the server.`);
});
