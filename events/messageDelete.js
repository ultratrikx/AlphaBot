const client = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("messageDelete", async (message) => {
    if (!message.partial) {
        const channel = message.guild.channels.cache.find(
            (channel) => channel.name == '🔧-bot-moderation',
        );
        const user = message.guild.members.cache.get(
            '636001855339495434',
        );
        if (channel) {
            const embed = new MessageEmbed()
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

            channel.send({embeds: [embed]});
            user.send({embeds: [embed]});
        }
    }
});
