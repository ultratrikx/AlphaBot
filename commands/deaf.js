const { GuildMember } = require('discord.js');

module.exports = {
    name: 'deaf',
    cooldown: 5,
    description: 'makes people lose their ears, sort of',
    execute(client, message, args, Discord) {
        const taggedMembers = message.mentions.members;

        for (let [, member] of taggedMembers) {
            member.voice
                .setDeaf(true)
                .then(() =>
                    console.log(`Deafened ${member.displayName}`),
                )
                .catch(console.error);
            message.channel.send(`deafened ${member.displayName}`);
        }
    },
};
