module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    execute(message, args){
        const target = message.mentions.users.first();
        if(message.member.roles.cache.has('689142040965152778', '665035759861891072')){
            if(target){
              const memberTarget = message.guild.members.cache.get(target.id);
                target.send('haha get kicked');
                memberTarget.kick();
                message.channel.send("User has been kicked");
             }else{
                message.channel.send(`mention a user and try again`);
             }

        } else{
            message.channel.send(`not an admin i see, this power is too much for you mere mortal`);
        }
    }

}