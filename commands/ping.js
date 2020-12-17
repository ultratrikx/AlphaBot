module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send(`hi there, now shut up\n`
            + `anyways, heres the ping; 🏓 ${Math.round(message.client.ws.ping)} ms`)
    }
}