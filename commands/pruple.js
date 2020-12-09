module.exports = {
    name: 'pruple',
    description: "this is a pruple command!",
    execute(message, args){

        if(message.member.roles.cache.has('785671209634234368')){
            message.channel.send('the og gang, nice')

        } else{
            message.channel.send('welcome to the og club');
            message.member.roles.add('785671209634234368');
            message.member.roles.remove('785672595706085397');
            message.member.roles.remove('785672717793755176');
            message.member.roles.remove('785672794573897729');
            message.member.roles.remove('785671353902432257');
            message.member.roles.remove('785979645082206228');
            message.member.roles.remove('785979334204063775');
        }
       

    }
}