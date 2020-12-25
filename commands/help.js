module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commands')
        .setAuthor('Alpha Bot#0038', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription('Here’s the list of commands!\n\n'
            + '**Normal Commands**\n'
            + 'type `.ping` to get rudely insulted\n'
            + 'type `.hi` to get haunted\n'
            + 'type `.babykata2` for meme\n'
            + 'type `.weather [location]` for weather of said location\n'
            + 'type `.covid [country]` for info about their covid cases\n'
            + 'type `.math [math equation]` for calculation\n'
            + 'type `.meme` for a meme (they may contain swearing)\n'
            + 'type `.botinfo` for information about the bot\n\n'
            + '**Admin Commands**\n'
            + 'type `.clear [number]` to clear messages\n'
            + 'type `.mute [@user] [number]m or s` to timed mute mentioned user \n'
            + 'type `.unmute [@user]` to manually unmute the mentioned user\n '
            + 'type `.kick [@user]` to kick mentioned user\n'
            + 'type `.ban [@user]` to punish someone who says trans right aren‘t human rights\n\n'
            + '**Colour Role Commands**\n'
            + 'type `.redrole` to get a red colour on your name\n'
            + 'type `.blues` to get the blue colour on you name\n'
            + 'type `.grebn` to become shrek\n'
            + 'type `.pruple` to become pruple\n'
            + 'type `.rameningscolour` to cause confuse\n'
            + 'type `.admincolour` to get the black admin colour (only for admins you idiot)\n'
            + 'type `.boostercolour` to get the booster pink colour (boost this server to unlock this)')

            
        .setFooter('Made by nf#0001 in partnership with ultratrikx#1056 and Alpha Bot#0038');

        message.channel.send(newEmbed);
    }
}