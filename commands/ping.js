module.exports = {
    name: 'ping',
    description: "get the lag for the bot",
    execute(message, args) {
        message.channel.send(`heres the ping; 🏓 ${Math.round(client.ws.ping)} ms`)
    }
}