module.exports = {
    name: 'reactionrole',
    description: 'this is a blues command!',
    async execute(client, message, args, Discord) {
        const channel = '786025091070033941';
        const grebnRole = message.guild.roles.cache.find(
            (role) => role.name === 'grebn',
        );
        const bluesRole = message.guild.roles.cache.find(
            (role) => role.name === 'blues',
        );
        const prupleRole = message.guild.roles.cache.find(
            (role) => role.name === 'pruple',
        );
        const blackRole = message.guild.roles.cache.find(
            (role) => role.name === 'black',
        );
        const adminblackRole = message.guild.roles.cache.find(
            (role) => role.name === 'adminblack',
        );
        const reddeadRole = message.guild.roles.cache.find(
            (role) => role.name === 'red-dead',
        );
        const organRole = message.guild.roles.cache.find(
            (role) => role.name === 'organ',
        );
        const serotoninpinkRole = message.guild.roles.cache.find(
            (role) => role.name === 'serotoninpink',
        );
        const pollUpdatesRole = message.guild.roles.cache.find(
            (role) => role.name === 'Poll Updates',
        );

        const grebnEmoji = '🟩';
        const bluesEmoji = '🟦';
        const prupleEmoji = '🟪';
        const blackEmoji = '⬛';
        const adminblackEmoji = '⚫';
        const organEmoji = '🟧';
        const reddeadEmoji = '🟥';
        const serotoninpinkEmoji = '🟣';
        const pollUpdatesEmoji = '❔';

        let embed = new Discord.MessageEmbed()
            .setColor('#b5ffff')
            .setTitle('Add On Roles by Yourself!!')
            .setDescription(
                'You can always change!!\n\n' +
                    `${grebnEmoji} for shrek colour\n` +
                    `${reddeadEmoji} for red colour\n` +
                    `${bluesEmoji} for blue colour\n` +
                    `${prupleEmoji} for pruple colour\n` +
                    `${blackEmoji} for black colour\n` +
                    `${organEmoji} for black colour\n` +
                    `${pollUpdatesEmoji} to be pinged for polls`,
            );

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(grebnEmoji);
        messageEmbed.react(reddeadEmoji);
        messageEmbed.react(bluesEmoji);
        messageEmbed.react(prupleEmoji);
        messageEmbed.react(blackEmoji);
        messageEmbed.react(organEmoji);
        messageEmbed.react(pollUpdatesEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial)
                await reaction.message.fetch();
            if (reaction.partial) await reaction.fecth();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == grebnEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(grebnRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(bluesRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(reddeadRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(prupleRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(blackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(adminblackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(serotoninpinkRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(organRole);
                }
                if (reaction.emoji.name == reddeadEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(reddeadRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(grebnRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(bluesRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(prupleRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(blackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(adminblackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(serotoninpinkRole);
                }
                if (reaction.emoji.name == bluesEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(bluesRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(grebnRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(reddeadRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(prupleRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(blackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(adminblackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(serotoninpinkRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(organRole);
                }
                if (reaction.emoji.name == prupleEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(prupleRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(bluesRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(grebnRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(reddeadRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(blackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(adminblackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(serotoninpinkRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(organRole);
                }
                if (reaction.emoji.name == blackEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(blackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(prupleRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(bluesRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(grebnRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(reddeadRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(adminblackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(serotoninpinkRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(organRole);
                }
                if (reaction.emoji.name == organEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(organRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(prupleRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(bluesRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(grebnRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(reddeadRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(adminblackRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(serotoninpinkRole);
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(blackRole);
                }
                if (reaction.emoji.name == pollUpdatesEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(pollUpdatesRole);
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
                if (reaction.emoji.name == grebnEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(grebnRole);
                }
                if (reaction.emoji.name == reddeadEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(reddeadRole);
                }
                if (reaction.emoji.name == bluesEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(bluesRole);
                }
                if (reaction.emoji.name == prupleEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(prupleRole);
                }
                if (reaction.emoji.name == blackEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(blackRole);
                }
                if (reaction.emoji.name == adminblackEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(adminblackRole);
                }
                if (reaction.emoji.name == serotoninpinkEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(serotoninpinkRole);
                }
                if (reaction.emoji.name == pollUpdatesEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(pollUpdatesRole);
                }
                if (reaction.emoji.name == organEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(organRole);
                }
            }
        });
    },
};
