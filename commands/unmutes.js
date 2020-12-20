const { GuildMember } = require("discord.js");

module.exports = {
    name: 'unmutes',
    cooldown: 5,
    description: 'Deafens mentioned user or users.',
    execute(message, args) {
        const taggedMembers = message.mentions.members;

        for (let [, member] of taggedMembers) {
            member.voice.setMute(false)
                .then(() => console.log(`unmuted ${member.displayName}`))
                .catch(console.error);
                message.channel.send(`unmuted ${member.displayName}`)
        }
    },
};