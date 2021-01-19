module.exports = {
    name: 'ping',
    description: 'get the lag for the bot',
    execute(client, message, args, Discord) {
        message.channel.send(
            `heres the ping; 🏓 ${Math.round(client.ws.ping)} ms`,
        );
    },
};
