const { GuildMember } = require("discord.js");

module.exports = {
    name: 'mutes',
    cooldown: 5,
    description: 'shush, in a vc',
    execute(message, args) {
        const taggedMembers = message.mentions.members;

        for (let [, member] of taggedMembers) {
            member.voice.setMute(true)
                .then(() => console.log(`Muted ${member.displayName}`))
                .catch(console.error);
            message.channel.send(`muted ${member.displayName}`)
        }
    },
};