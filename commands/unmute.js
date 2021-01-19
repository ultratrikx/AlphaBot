module.exports = {
    name: 'unmute',
    description: 'unshush',
    execute(client, message, args, Discord) {
        const target = message.mentions.users.first();
        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (target) {
                let mainRole = message.guild.roles.cache.find(
                    (role) => role.name === 'Member',
                );
                let muteRole = message.guild.roles.cache.find(
                    (role) => role.name === 'Muted',
                );

                let memberTarget = message.guild.members.cache.get(
                    target.id,
                );

                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(
                    `<@${memberTarget.user.id}> has been unmuted`,
                );
                target.send('you have been unmuted');
            } else {
                message.channel.send(
                    `member doesn't exist (i think)`,
                );
            }
        } else {
            message.reply(
                'rise in the rank of powers to use this command',
            );
        }
    },
};
