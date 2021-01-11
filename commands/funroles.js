module.exports = {
    name: 'funroles',
    description: 'fun roles for exclusive channel access',
    async execute(message, args, Discord, client) {
        const channel = '786025091070033941';

        const weebRole = message.guild.roles.cache.find(
            (role) => role.name === 'weeb',
        );
        const nerdRole = message.guild.roles.cache.find(
            (role) => role.name === 'nerd',
        );
        const artistRole = message.guild.roles.cache.find(
            (role) => role.name === 'artist',
        );
        const gamerRole = message.guild.roles.cache.find(
            (role) => role.name === 'gamer',
        );

        const weebEmoji = '✨';
        const nerdEmoji = '💾';
        const artistEmoji = '🎨';
        const gamerEmoji = '🎮';

        let embed = new Discord.MessageEmbed()
            .setColor('#ffb5fe')
            .setTitle('Get Some Fun Roles')
            .setDescription(
                `Roles, get them here\n\n` +
                    `${nerdEmoji} for access to tech and nerd channel\n` +
                    `${artistEmoji} for access to post in the art channel\n` +
                    `${gamerEmoji} for access to talk in games channel\n` +
                    `${weebEmoji} for access to anime channel`,
            );

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(nerdEmoji);
        messageEmbed.react(artistEmoji);
        messageEmbed.react(gamerEmoji);
        messageEmbed.react(weebEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial)
                await reaction.message.fetch();
            if (reaction.partial) await reaction.fecth();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == weebEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(weebRole);
                }
                if (reaction.emoji.name == artistEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(artistRole);
                }
                if (reaction.emoji.name == gamerEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(gamerRole);
                }
                if (reaction.emoji.name == nerdEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(nerdRole);
                }
            } else {
                return;
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial)
                await reaction.message.fetch();
            if (reaction.partial) await reaction.fecth();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == weebEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(weebRole);
                }
                if (reaction.emoji.name == artistEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(artistRole);
                }
                if (reaction.emoji.name == gamerEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(gamerRole);
                }
                if (reaction.emoji.name == nerdEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(nerdRole);
                }
            }
        });
    },
};
