module.exports = {
    name: 'clear',
    description: 'delets messages (typo on purpose)',
    async execute(client, message, args, Discord) {
        if (!args[0])
            return message.reply(
                'enter a number of messages to clear',
            );
        if (isNaN(args[0]))
            return message.reply(
                'enter a number following the command like so `.clear [1]`',
            );

        if (args[0] > 100)
            return message.reply(
                'the maximum amount of messages you can delete is 100',
            );
        if (args[0] < 1)
            return message.reply('delete at least 1 message');

        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply(
                'nuh uh, this is too powerful for you to use',
            );
        } else {
            message.channel.messages
                .fetch({ limit: args[0] })
                .then((messages) => {
                    message.channel.bulkDelete(messages);
                    message
                        .reply('Done')
                        .then((m) => m.delete({ timeout: 500 }));
                });
        }
    },
};
