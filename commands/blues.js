module.exports = {
    name: 'blues',
    description: "gives you a blue role",
    execute(message, args) {

        if (message.member.roles.cache.has('785672717793755176')) {
            message.channel.send('tis blue')

        } else {
            message.channel.send('here you go :D');
            message.member.roles.add('785672717793755176');
            message.member.roles.remove('785672595706085397');
            message.member.roles.remove('785672794573897729');
            message.member.roles.remove('785671353902432257');
            message.member.roles.remove('785671209634234368');
            message.member.roles.remove('785979334204063775');
            message.member.roles.remove('785979645082206228');
        }


    }
}