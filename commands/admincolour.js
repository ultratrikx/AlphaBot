module.exports = {
    name: 'admincolour',
    description: "gives the admin who uses this a black role colour",
    execute(message, args) {

        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send('top secret admin colour achieved');
            message.member.roles.add('785979334204063775')
            message.member.roles.remove('785979645082206228');
            message.member.roles.remove('785672595706085397');
            message.member.roles.remove('785671353902432257');
            message.member.roles.remove('785671209634234368');
            message.member.roles.remove('785672717793755176');
            message.member.roles.remove('785672794573897729');

        } else {
            message.channel.send('nuh uh, this is for admins only');
        }


    }
}