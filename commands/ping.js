module.exports = {
    name: 'ping',
    description: "get the lag for the bot",
    execute(message, args){
        message.channel.send(`hi there, now shut up\n`
            + `anyways, heres the ping; 🏓 ${Math.round(message.client.ws.ping)} ms`)
    }
}