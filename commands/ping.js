module.exports = {
    name: 'ping',
    description: "get the lag for the bot",
    execute(message, args) {
        message.channel.send(`hi there, now stop pinging me\n`
            + `either way, heres the ping; 🏓 ${Math.round(client.ws.ping)} ms`)
    }
}