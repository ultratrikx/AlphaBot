const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: "ban hammer",
    async execute(client, message, args){
        
        if(message.member.hasPermission("BAN_MEMBERS")){ 

        const member = message.mentions.members.first() //|| message.guild.members.cache.get(args[0]);
        const memberTarget = message.guild.members.cache.get(member.id);
        const channel = client.channels.cache.get('699693464664932474')

        if(!args[0]) return message.channel.send('mention a user please');

        if(!member) return message.channel.send('Can\'t seem to find this user.');
        if(!member.bannable) return message.channel.send('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine');

        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t ban yourself!');

        let reason = args.slice(1).join(" ");

        if (reason == undefined) reason = 'Unspecified';

        memberTarget.ban()
        .catch(err => {
            if(err) return message.channel.send('Something went very wrong')
        })

        const banembed = new Discord.MessageEmbed()
        .setColor('#ff4d4d')
        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', member)
        .addField('Banned by', message.author)
        .addField('Reason', `${reason}.`)
        .setFooter('Time Banned', client.user.displayAvatarURL())
        .setTimestamp()

        channel.send(banembed);
        member.send('ban hammer go brr, btw the reason you were banned was\n'
        + `\`${reason}\``)

    }else{
        message.channel.send('You can\'t use that!');
    } 

    }
}