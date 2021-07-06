module.exports = (Discord, client, message) => {
    if (!message.partial) {
        const channel = message.guild.channels.cache.find(
            (channel) => channel.name == '🔧-bot-moderation',
        );
        const user = message.guild.members.cache.get(
            '636001855339495434',
        );
        if (channel) {
            const embed = new Discord.MessageEmbed()
                .setColor('#f55151')
                .setTitle('Deleted Message')
                .setThumbnail(message.author.displayAvatarURL());
            if (message.attachments.size !== 0) {
                embed.addField(
                    'Attachments',
                    `${message.attachments.first().url}`,
                );
            }
            embed
                .addField('Author', `<@${message.author.id}>`)
                .addField('Channel', `${message.channel.name}`)
                .setDescription(
                    `**Message Content:** ${message.content}`,
                )
                .setTimestamp();

            channel.send(embed);
            user.send(embed);
        }
    }
};
// TODO Not make the deleted message show up in giftiess server but the server's designated moderation channel
