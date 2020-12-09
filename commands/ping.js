module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send('hi im baby kata 2, nice to meet you. may i haunt you in your dreams?');
    }
}