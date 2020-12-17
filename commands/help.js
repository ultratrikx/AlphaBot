module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commands')
        .setAuthor('Alpha Bot#0038 (aka baby kata 2)', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription('Here’s the list of commands!\n\n'
            + '**Normal Commands**\n'
            + 'type `.ping` to get rudely insulted\n'
            + 'type `.hi` to get haunted\n'
            + 'type `.babykata2` for meme\n\n'
            + '**Colour Role Commands**\n'
            + 'type `.redrole` to get a red colour on your name\n'
            + 'type `.blues` to get the blue colour on you name\n'
            + 'type `.grebn` to become shrek\n'
            + 'type `.pruple` to become pruple\n'
            + 'type `.rameningscolour` to cause confuse\n'
            + 'type `.admincolour` to get the black admin colour (only for admins you idiot)\n'
            + 'type `.boostercolour` to get the booster pink colour (boost this server to unlock this)')

            
        .setFooter('Made by nf#0001 in partnership with ultratrikx#1056 and Alpha Bot#0038 (aka baby kata 2)');

        message.channel.send(newEmbed);
    }
}