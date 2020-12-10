module.exports = {
    name: 'rickroll',
    description: "this is a ping command!",
    execute(message, args, Discord, client){
        const newsEmbed = new Discord.MessageEmbed()
        .setTitle('So you want to Rickroll Someone?')
        .setAuthor('Alpha Bot#0038 (aka baby kata 2)', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription('Use this link https://bit.ly/340Hkbi')
        .setFooter('Made by ultratrikx#1056 and Alpha Bot#0038 (aka baby kata 2)');
        
        message.channel.send(newsEmbed);
    }
}