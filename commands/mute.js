const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "shush",
    execute(message, args) {
        const target = message.mentions.users.first();
        if(message.member.roles.cache.has('689142040965152778', '665035759861891072')){
        if (target) {
 
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
              let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
             let memberTarget = message.guild.members.cache.get(target.id);
 
              if (!args[1]) {
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                target.send('what did you do to feel this pain?');
                return
              }
               memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
                target.send('what did you do to feel this pain?');
 
             setTimeout(function () {
                 memberTarget.roles.remove(muteRole.id);
                 target.send('anti-mute protocol initiated');
              }, ms(args[1]));
          } else {
            message.channel.send('member is anti-exist');
         }
        }else{
            message.reply('rise in the rank of powers to use this command')
        }
    }
}