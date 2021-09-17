const client = require("../index");

client.on("guildMemberAdd", async (guildMember) => {
    guildMember.guild.channels.cache
        .find((channel) => channel.name == '✌🏼-general')
        .send(`🎉 Welcome <@${guildMember.user.id}>`);
});
