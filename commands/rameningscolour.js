module.exports = {
    name: 'rameningscolour',
    aliases: ["black"],
    description: "black but not black",
    execute(message, args) {

        if (message.member.roles.cache.has('785671353902432257')) {
            message.channel.send('part of the cult i see')

        } else {
            message.channel.send('there is a hacker in the sever. everyone panic.');
            message.member.roles.add('785671353902432257');
            message.member.roles.remove('785672595706085397');
            message.member.roles.remove('785672717793755176');
            message.member.roles.remove('785672794573897729');
            message.member.roles.remove('785671209634234368');
            message.member.roles.remove('785979645082206228');
            message.member.roles.remove('785979334204063775');

        }


    }
}