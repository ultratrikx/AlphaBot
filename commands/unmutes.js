const { GuildMember } = require('discord.js');

module.exports = {
    name: 'unmutes',
    cooldown: 5,
    description: 'unshush but in vc',
    execute(client, message, args, Discord) {
        const taggedMembers = message.mentions.members;

        for (let [, member] of taggedMembers) {
            member.voice
                .setMute(false)
                .then(() =>
                    console.log(`unmuted ${member.displayName}`),
                )
                .catch(console.error);
            message.channel.send(`unmuted ${member.displayName}`);
        }
    },
};
