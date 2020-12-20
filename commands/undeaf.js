const { GuildMember } = require("discord.js");

module.exports = {
    name: 'undeaf',
    cooldown: 5,
    description: 'Deafens mentioned user or users.',
    execute(message, args) {
        const taggedMembers = message.mentions.members;

        for (let [, member] of taggedMembers) {
            member.voice.setDeaf(false)
                .then(() => console.log(`undeafened ${member.displayName}`))
                .catch(console.error);
                message.channel.send(`undeafened ${member.displayName}`)
        }

    },
};