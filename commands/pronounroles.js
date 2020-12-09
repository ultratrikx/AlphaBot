module.exports = {
    name: 'pronounroles',
    description: "this is a pronouns command!",
    async execute(message, args, Discord, client){
        const channel = '786025091070033941';
        const hetheyRole = message.guild.roles.cache.find(role => role.name === "he/they");
        const shetheyRole = message.guild.roles.cache.find(role => role.name === "she/they");
        const hehimRole = message.guild.roles.cache.find(role => role.name === "he/him");
        const sheherRole = message.guild.roles.cache.find(role => role.name === "she/her");
        const theythemRole = message.guild.roles.cache.find(role => role.name === "they/them");
        const xexemRole = message.guild.roles.cache.find(role => role.name === "xe/xem");


        const hetheyEmoji = '🟢'
        const shetheyEmoji = '🟡'
        const hehimEmoji = '🔵'
        const sheherEmoji = '🟣'
        const theythemEmoji = '🔴'
        const xexemEmoji = '⚪'

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Add on Pronoun Roles!!')
            .setDescription('I hope this goes without saying but don`t abuse these\n\n'
                + `${hetheyEmoji} for those who would like to be called with the pronouns he/they\n`
                + `${shetheyEmoji} for those who would like to be called with the pronouns she/they\n`
                + `${hehimEmoji} for those who would like to be called with the pronouns he/him\n`
                + `${sheherEmoji} for those who would like to be called with the pronouns she/her\n`
                + `${theythemEmoji} for those who would like to be called with the pronouns they/them\n`
                + `${xexemEmoji} for those who would like to be called with the pronouns xe/xem`);

          let messageEmbed = await message.channel.send(embed);
          messageEmbed.react(hetheyEmoji);
          messageEmbed.react(shetheyEmoji);
          messageEmbed.react(hehimEmoji);
          messageEmbed.react(sheherEmoji);
          messageEmbed.react(theythemEmoji);
          messageEmbed.react(xexemEmoji);

          client.on('messageReactionAdd', async (reaction, user) => {
              if(reaction.message.partial) await reaction.message.fetch();
              if (reaction.partial) await reaction.fecth();
              if (user.bot) return;
              if (!reaction.message.guild) return;

              if (reaction.message.channel.id == channel) { 
                  if (reaction.emoji.name == hetheyEmoji){
                      await reaction.message.guild.members.cache.get(user.id).roles.add(hetheyRole);
                  }
                  if (reaction.emoji.name == shetheyEmoji){
                      await reaction.message.guild.members.cache.get(user.id).roles.add(shetheyRole);
                  }
                  if (reaction.emoji.name == hehimEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(hehimRole);
                  }
                  if (reaction.emoji.name == sheherEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(sheherRole);
                  }
                  if (reaction.emoji.name == theythemEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(theythemRole);
                  }  
                  if (reaction.emoji.name == xexemEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(xexemRole);
                  }          
              } else {
                  return;
              }
          });

          client.on('messageReactionRemove', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fecth();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) { 
                if (reaction.emoji.name == hetheyEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(hetheyRole);
                }
                if (reaction.emoji.name == shetheyEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(shetheyRole);
                }
                if (reaction.emoji.name == hehimEmoji){
                  await reaction.message.guild.members.cache.get(user.id).roles.remove(hehimRole);
                }
                if (reaction.emoji.name == sheherEmoji){
                  await reaction.message.guild.members.cache.get(user.id).roles.remove(sheherRole);
                }
                if (reaction.emoji.name == theythemEmoji){
                  await reaction.message.guild.members.cache.get(user.id).roles.remove(theythemRole);
                }  
                if (reaction.emoji.name == xexemEmoji){
                  await reaction.message.guild.members.cache.get(user.id).roles.remove(xexemRole);
                }          
            }
          });

          
        }
       

    }