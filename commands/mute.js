const ms = require('ms');
module.exports = {
    name: 'mute',
    description: 'shush',
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

                if (!args[1]) {
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(
                        `<@${memberTarget.user.id}> has been muted`,
                    );
                    target.send('you where muted');
                    return;
                }
                memberTarget.roles.add(muteRole.id);
                message.channel.send(
                    `<@${
                        memberTarget.user.id
                    }> has been muted for ${ms(ms(args[1]))}`,
                );
                target.send('you have been muted');

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                    target.send('unmuted');
                }, ms(args[1]));
            } else {
                message.channel.send('member is anti-exist');
            }
        } else {
            message.reply(
                'rise in the rank of powers to use this command',
            );
        }
    },
};
