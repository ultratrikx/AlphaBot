const { GuildMember } = require("discord.js");

module.exports = {
    name: 'deaf',
    cooldown: 5,
    description: 'Deafens mentioned user or users.',
    execute(message, args) {
        const taggedMembers = message.mentions.members;

        for (let [, member] of taggedMembers) {
            member.voice.setDeaf(true)
                .then(() => console.log(`Deafened ${member.displayName}`))
                .catch(console.error);
                message.channel.send(`deafened ${member.displayName}`)
        }
    },
};