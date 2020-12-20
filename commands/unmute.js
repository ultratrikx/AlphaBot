module.exports = {
    name: 'unmute',
    description: "This unmutes a member",
    execute(message, args){
        const target = message.mentions.users.first();
        if(message.member.roles.cache.has('689142040965152778', '665035759861891072')){
            if(target){
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
                let memberTarget= message.guild.members.cache.get(target.id);
 
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been relieved of the pain`);
                target.send('you have been unpained');
        }   else{
                message.channel.send(`member doesn't exist (i think)`);

        }  
        }else{
            message.reply('rise in the rank of powers to use this command')
        }
    }
}