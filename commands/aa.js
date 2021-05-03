const gameone = new Discord.MessageEmbed()
    .setColor('#535ded')
    .setTitle(`${visitingteam} @ ${hometeam}`)
    .setDescription(`In ${arena}, ${location}`)
    .setAuthor(`Game ID: ${gameid}`)
    .setTimestamp();

if (gameover !== 'false') {
    gameone.addField('**Final**', '_ _');
} else {
    gameone.addField(`Tip Off @`, time);
}
gameone.addFields(
    {
        name: `${teamLogo[visitingteam]}  ${visitingteam} \`${vwins} - ${vloss}\``,
        value: `${vteamscore} PTS`,
        inline: true,
    },
    {
        name: `${teamLogo[hometeam]}  ${hometeam} \`${hwins} - ${hloss}\``,
        value: `${hteamscore} PTS`,
        inline: true,
    },
);
if (gameover == 'false' && period > 0 && periodend == 'true') {
    gameone.addField(`End of Q${period}`, '_ _');
}
if (gameover == 'false' && period > 0 && halftime == 'true') {
    gameone.addField(`Halftime`, '_ _');
}
if (
    gameover == 'false' &&
    period > 0 &&
    halftime == 'false' &&
    periodend == 'false'
) {
    gameone.addField(`🔴 Q${period} - ${clock}`, '_ _');
}
gameone.addField(`Broadcasters`, `${vbroadcast}, ${hbroadcast}`);
