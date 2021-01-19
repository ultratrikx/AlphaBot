module.exports = {
    name: 'boostercolour',
    description: 'gives the booster the sweet serotonin pink',
    execute(client, message, args, Discord) {
        if (message.member.roles.cache.has('707363002478755860')) {
            message.channel.send('serotonin pink here you go');
            message.member.roles.add('785979645082206228');
            message.member.roles.remove('785672595706085397');
            message.member.roles.remove('785671353902432257');
            message.member.roles.remove('785671209634234368');
            message.member.roles.remove('785672717793755176');
            message.member.roles.remove('785979334204063775');
            message.member.roles.remove('785672794573897729');
        } else {
            message.channel.send(
                'boost this server and get this colour',
            );
        }
    },
};
