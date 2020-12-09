module.exports = {
    name: 'redrole',
    description: "this is a redrole command!",
    execute(message, args){

        if(message.member.roles.cache.has('785672595706085397')){
            message.channel.send('ayyy, fellow red-dead')

        } else{
            message.channel.send('here you go :D');
            message.member.roles.add('785672595706085397').catch(console.error);
            message.member.roles.remove('785672717793755176');
            message.member.roles.remove('785672794573897729');
            message.member.roles.remove('785671353902432257');
            message.member.roles.remove('785671209634234368');
            message.member.roles.remove('785979645082206228');
            message.member.roles.remove('785979334204063775');
        }
       

    }
}