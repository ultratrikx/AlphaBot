const fetch = require('node-fetch');
const Discord = require('discord.js');
const pagination = require('discord.js-pagination');

module.exports = {
    name: 'nba',
    description: 'get nba game details for today',
    async execute(client, message, args, Discord) {
        const teamLogo = {
            ATL: '<:ATL:803375955501907978>',
            BOS: '<:BOS:803375959813521469>',
            BKN: '<:BKN:803375962816643123>',
            CHA: '<:CHA:803375963110244353>',
            CHI: '<:CHI:803375954822561832>',
            CLE: '<:CLE:803375957398257764>',
            DAL: '<:DAL:803375959452680202>',
            DEN: '<:DEN:803375963101986876>',
            DET: '<:DET:803377217890418748>',
            GSW: '<:GSW:803375965035298857>',
            HOU: '<:HOU:803375957603647549>',
            IND: '<:IND:803375958392438784>',
            LAC: '<:LAC:803375960023891968>',
            LAL: '<:LAL:803375961227264010>',
            MEM: '<:MEM:803375958551822397>',
            MIA: '<:MIA:803375965412786206>',
            MIL: '<:MIL:803375958027534356>',
            MIN: '<:MIN:803375961953271859>',
            NOP: '<:NOP:803375964830040115>',
            NYK: '<:NYK:803375957809430548>',
            OKC: '<:OKC:803376185869860885>',
            ORL: '<:ORL:803376186151141387>',
            PHI: '<:PHI:803375959558455356>',
            PHX: '<:PHX:803375957946793995>',
            POR: '<:POR:803375960173969428>',
            SAC: '<:SAC:803375965044342854>',
            SAS: '<:SAS:803375961771999312>',
            TOR: '<:TOR:803375963970207806>',
            UTA: '<:UTA:803375963135016980>',
            WAS: '<:WAS:803375959377969182>',
        };
        fetch(`http://data.nba.net/10s/prod/v1/today.json`)
            .then((response) => response.json())
            .then((data) => {
                data.links.currentDate.toLocaleString();
                const date = data.links.currentDate.toLocaleString();
                fetch(
                    `http://data.nba.net/10s/prod/v1/${date}/scoreboard.json`,
                )
                    .then((response) => response.json())
                    .then((data) => {
                        let gameamount = data.numGames.toLocaleString();
                        try {
                            if (
                                gameamount == 0 ||
                                gameamount == null ||
                                gameamount == undefined
                            ) {
                                message.channel.send(
                                    'There seems to be no games scheduled today, check back again at a later date\n' +
                                        'If you believe this is an error, please dm ultratrikx#2605',
                                );
                            }
                            if (gameamount == 1) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const pages = [start, gameone];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 2) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 3) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 4) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                //let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                //let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                // gameone.addField(
                                //     `Broadcasters`,
                                //     `${vbroadcast}, ${hbroadcast}`,
                                // );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 5) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 6) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                let visitingteam6 = data.games[5].vTeam.triCode.toLocaleString();
                                let hometeam6 = data.games[5].hTeam.triCode.toLocaleString();
                                let vteamscore6 = data.games[5].vTeam.score.toLocaleString();
                                let hteamscore6 = data.games[5].hTeam.score.toLocaleString();
                                let period6 = data.games[5].period.current.toLocaleString();
                                let time6 = data.games[5].startTimeEastern.toLocaleString();
                                let gameid6 = data.games[5].gameId.toLocaleString();
                                let gameover6 = data.games[5].isRecapArticleAvail.toLocaleString();
                                let arena6 = data.games[5].arena.name.toLocaleString();
                                let location6 = data.games[5].arena.city.toLocaleString();
                                let hwins6 = data.games[5].hTeam.win.toLocaleString();
                                let hloss6 = data.games[5].hTeam.loss.toLocaleString();
                                let vwins6 = data.games[5].vTeam.win.toLocaleString();
                                let vloss6 = data.games[5].vTeam.loss.toLocaleString();
                                let vbroadcast6 = data.games[5].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast6 = data.games[5].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock6 = data.games[5].clock.toLocaleString();
                                let halftime6 = data.games[5].period.isHalftime.toLocaleString();
                                let periodend6 = data.games[5].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const gamesix = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam6} @ ${hometeam6}`,
                                    )
                                    .setDescription(
                                        `In ${arena6}, ${location6}`,
                                    );
                                if (gameover6 !== 'false') {
                                    gamesix.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamesix.addField(
                                        `Tip Off @`,
                                        time6,
                                    );
                                }
                                gamesix.addFields(
                                    {
                                        name: `${teamLogo[visitingteam6]}  ${visitingteam6} \`${vwins6} - ${vloss6}\``,
                                        value: `${vteamscore6} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam6]}  ${hometeam6} \`${hwins6} - ${hloss6}\``,
                                        value: `${hteamscore6} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    periodend6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `End of Q${period6}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'true' &&
                                    periodend6 !== 'true'
                                ) {
                                    gamesix.addField(
                                        `🔴 Q${period6} - ${clock6}`,
                                        '_ _',
                                    );
                                }
                                gamesix.addField(
                                    `Broadcasters`,
                                    `${vbroadcast6}, ${hbroadcast6}`,
                                );
                                gamesix.setAuthor(
                                    `Game ID: ${gameid6}`,
                                );
                                gamesix.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                    gamesix,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 7) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                let visitingteam6 = data.games[5].vTeam.triCode.toLocaleString();
                                let hometeam6 = data.games[5].hTeam.triCode.toLocaleString();
                                let vteamscore6 = data.games[5].vTeam.score.toLocaleString();
                                let hteamscore6 = data.games[5].hTeam.score.toLocaleString();
                                let period6 = data.games[5].period.current.toLocaleString();
                                let time6 = data.games[5].startTimeEastern.toLocaleString();
                                let gameid6 = data.games[5].gameId.toLocaleString();
                                let gameover6 = data.games[5].isRecapArticleAvail.toLocaleString();
                                let arena6 = data.games[5].arena.name.toLocaleString();
                                let location6 = data.games[5].arena.city.toLocaleString();
                                let hwins6 = data.games[5].hTeam.win.toLocaleString();
                                let hloss6 = data.games[5].hTeam.loss.toLocaleString();
                                let vwins6 = data.games[5].vTeam.win.toLocaleString();
                                let vloss6 = data.games[5].vTeam.loss.toLocaleString();
                                let vbroadcast6 = data.games[5].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast6 = data.games[5].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock6 = data.games[5].clock.toLocaleString();
                                let halftime6 = data.games[5].period.isHalftime.toLocaleString();
                                let periodend6 = data.games[5].period.isEndOfPeriod.toLocaleString();

                                let visitingteam7 = data.games[6].vTeam.triCode.toLocaleString();
                                let hometeam7 = data.games[6].hTeam.triCode.toLocaleString();
                                let vteamscore7 = data.games[6].vTeam.score.toLocaleString();
                                let hteamscore7 = data.games[6].hTeam.score.toLocaleString();
                                let period7 = data.games[6].period.current.toLocaleString();
                                let time7 = data.games[6].startTimeEastern.toLocaleString();
                                let gameid7 = data.games[6].gameId.toLocaleString();
                                let gameover7 = data.games[6].isRecapArticleAvail.toLocaleString();
                                let arena7 = data.games[6].arena.name.toLocaleString();
                                let location7 = data.games[6].arena.city.toLocaleString();
                                let hwins7 = data.games[6].hTeam.win.toLocaleString();
                                let hloss7 = data.games[6].hTeam.loss.toLocaleString();
                                let vwins7 = data.games[6].vTeam.win.toLocaleString();
                                let vloss7 = data.games[6].vTeam.loss.toLocaleString();
                                let vbroadcast7 = data.games[6].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast7 = data.games[6].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock7 = data.games[6].clock.toLocaleString();
                                let halftime7 = data.games[6].period.isHalftime.toLocaleString();
                                let periodend7 = data.games[6].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const gamesix = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam6} @ ${hometeam6}`,
                                    )
                                    .setDescription(
                                        `In ${arena6}, ${location6}`,
                                    );
                                if (gameover6 !== 'false') {
                                    gamesix.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamesix.addField(
                                        `Tip Off @`,
                                        time6,
                                    );
                                }
                                gamesix.addFields(
                                    {
                                        name: `${teamLogo[visitingteam6]}  ${visitingteam6} \`${vwins6} - ${vloss6}\``,
                                        value: `${vteamscore6} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam6]}  ${hometeam6} \`${hwins6} - ${hloss6}\``,
                                        value: `${hteamscore6} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    periodend6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `End of Q${period6}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'true' &&
                                    periodend6 !== 'true'
                                ) {
                                    gamesix.addField(
                                        `🔴 Q${period6} - ${clock6}`,
                                        '_ _',
                                    );
                                }
                                gamesix.addField(
                                    `Broadcasters`,
                                    `${vbroadcast6}, ${hbroadcast6}`,
                                );
                                gamesix.setAuthor(
                                    `Game ID: ${gameid6}`,
                                );
                                gamesix.setTimestamp();

                                const gameseven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam7} @ ${hometeam7}`,
                                    )
                                    .setDescription(
                                        `In ${arena7}, ${location7}`,
                                    );
                                if (gameover7 !== 'false') {
                                    gameseven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameseven.addField(
                                        `Tip Off @`,
                                        time7,
                                    );
                                }
                                gameseven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam7]}  ${visitingteam7} \`${vwins7} - ${vloss7}\``,
                                        value: `${vteamscore7} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam7]}  ${hometeam7} \`${hwins7} - ${hloss7}\``,
                                        value: `${hteamscore7} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    periodend7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `End of Q${period7}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'true' &&
                                    periodend7 !== 'true'
                                ) {
                                    gameseven.addField(
                                        `🔴 Q${period7} - ${clock7}`,
                                        '_ _',
                                    );
                                }
                                gameseven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast7}, ${hbroadcast7}`,
                                );
                                gameseven.setAuthor(
                                    `Game ID: ${gameid7}`,
                                );
                                gameseven.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                    gamesix,
                                    gameseven,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 8) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                let visitingteam6 = data.games[5].vTeam.triCode.toLocaleString();
                                let hometeam6 = data.games[5].hTeam.triCode.toLocaleString();
                                let vteamscore6 = data.games[5].vTeam.score.toLocaleString();
                                let hteamscore6 = data.games[5].hTeam.score.toLocaleString();
                                let period6 = data.games[5].period.current.toLocaleString();
                                let time6 = data.games[5].startTimeEastern.toLocaleString();
                                let gameid6 = data.games[5].gameId.toLocaleString();
                                let gameover6 = data.games[5].isRecapArticleAvail.toLocaleString();
                                let arena6 = data.games[5].arena.name.toLocaleString();
                                let location6 = data.games[5].arena.city.toLocaleString();
                                let hwins6 = data.games[5].hTeam.win.toLocaleString();
                                let hloss6 = data.games[5].hTeam.loss.toLocaleString();
                                let vwins6 = data.games[5].vTeam.win.toLocaleString();
                                let vloss6 = data.games[5].vTeam.loss.toLocaleString();
                                let vbroadcast6 = data.games[5].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast6 = data.games[5].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock6 = data.games[5].clock.toLocaleString();
                                let halftime6 = data.games[5].period.isHalftime.toLocaleString();
                                let periodend6 = data.games[5].period.isEndOfPeriod.toLocaleString();

                                let visitingteam7 = data.games[6].vTeam.triCode.toLocaleString();
                                let hometeam7 = data.games[6].hTeam.triCode.toLocaleString();
                                let vteamscore7 = data.games[6].vTeam.score.toLocaleString();
                                let hteamscore7 = data.games[6].hTeam.score.toLocaleString();
                                let period7 = data.games[6].period.current.toLocaleString();
                                let time7 = data.games[6].startTimeEastern.toLocaleString();
                                let gameid7 = data.games[6].gameId.toLocaleString();
                                let gameover7 = data.games[6].isRecapArticleAvail.toLocaleString();
                                let arena7 = data.games[6].arena.name.toLocaleString();
                                let location7 = data.games[6].arena.city.toLocaleString();
                                let hwins7 = data.games[6].hTeam.win.toLocaleString();
                                let hloss7 = data.games[6].hTeam.loss.toLocaleString();
                                let vwins7 = data.games[6].vTeam.win.toLocaleString();
                                let vloss7 = data.games[6].vTeam.loss.toLocaleString();
                                let vbroadcast7 = data.games[6].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast7 = data.games[6].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock7 = data.games[6].clock.toLocaleString();
                                let halftime7 = data.games[6].period.isHalftime.toLocaleString();
                                let periodend7 = data.games[6].period.isEndOfPeriod.toLocaleString();

                                let visitingteam8 = data.games[7].vTeam.triCode.toLocaleString();
                                let hometeam8 = data.games[7].hTeam.triCode.toLocaleString();
                                let vteamscore8 = data.games[7].vTeam.score.toLocaleString();
                                let hteamscore8 = data.games[7].hTeam.score.toLocaleString();
                                let period8 = data.games[7].period.current.toLocaleString();
                                let time8 = data.games[7].startTimeEastern.toLocaleString();
                                let gameid8 = data.games[7].gameId.toLocaleString();
                                let gameover8 = data.games[7].isRecapArticleAvail.toLocaleString();
                                let arena8 = data.games[7].arena.name.toLocaleString();
                                let location8 = data.games[7].arena.city.toLocaleString();
                                let hwins8 = data.games[7].hTeam.win.toLocaleString();
                                let hloss8 = data.games[7].hTeam.loss.toLocaleString();
                                let vwins8 = data.games[7].vTeam.win.toLocaleString();
                                let vloss8 = data.games[7].vTeam.loss.toLocaleString();
                                let vbroadcast8 = data.games[7].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast8 = data.games[7].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock8 = data.games[7].clock.toLocaleString();
                                let halftime8 = data.games[7].period.isHalftime.toLocaleString();
                                let periodend8 = data.games[7].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const gamesix = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam6} @ ${hometeam6}`,
                                    )
                                    .setDescription(
                                        `In ${arena6}, ${location6}`,
                                    );
                                if (gameover6 !== 'false') {
                                    gamesix.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamesix.addField(
                                        `Tip Off @`,
                                        time6,
                                    );
                                }
                                gamesix.addFields(
                                    {
                                        name: `${teamLogo[visitingteam6]}  ${visitingteam6} \`${vwins6} - ${vloss6}\``,
                                        value: `${vteamscore6} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam6]}  ${hometeam6} \`${hwins6} - ${hloss6}\``,
                                        value: `${hteamscore6} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    periodend6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `End of Q${period6}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'true' &&
                                    periodend6 !== 'true'
                                ) {
                                    gamesix.addField(
                                        `🔴 Q${period6} - ${clock6}`,
                                        '_ _',
                                    );
                                }
                                gamesix.addField(
                                    `Broadcasters`,
                                    `${vbroadcast6}, ${hbroadcast6}`,
                                );
                                gamesix.setAuthor(
                                    `Game ID: ${gameid6}`,
                                );
                                gamesix.setTimestamp();

                                const gameseven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam7} @ ${hometeam7}`,
                                    )
                                    .setDescription(
                                        `In ${arena7}, ${location7}`,
                                    );
                                if (gameover7 !== 'false') {
                                    gameseven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameseven.addField(
                                        `Tip Off @`,
                                        time7,
                                    );
                                }
                                gameseven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam7]}  ${visitingteam7} \`${vwins7} - ${vloss7}\``,
                                        value: `${vteamscore7} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam7]}  ${hometeam7} \`${hwins7} - ${hloss7}\``,
                                        value: `${hteamscore7} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    periodend7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `End of Q${period7}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'true' &&
                                    periodend7 !== 'true'
                                ) {
                                    gameseven.addField(
                                        `🔴 Q${period7} - ${clock7}`,
                                        '_ _',
                                    );
                                }
                                gameseven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast7}, ${hbroadcast7}`,
                                );
                                gameseven.setAuthor(
                                    `Game ID: ${gameid7}`,
                                );
                                gameseven.setTimestamp();

                                const gameeight = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam8} @ ${hometeam8}`,
                                    )
                                    .setDescription(
                                        `In ${arena8}, ${location8}`,
                                    );
                                if (gameover8 !== 'false') {
                                    gameeight.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeight.addField(
                                        `Tip Off @`,
                                        time8,
                                    );
                                }
                                gameeight.addFields(
                                    {
                                        name: `${teamLogo[visitingteam8]}  ${visitingteam8} \`${vwins8} - ${vloss8}\``,
                                        value: `${vteamscore8} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam8]}  ${hometeam8} \`${hwins8} - ${hloss8}\``,
                                        value: `${hteamscore8} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    periodend8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `End of Q${period8}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'true' &&
                                    periodend8 !== 'true'
                                ) {
                                    gameeight.addField(
                                        `🔴 Q${period8} - ${clock8}`,
                                        '_ _',
                                    );
                                }
                                gameeight.addField(
                                    `Broadcasters`,
                                    `${vbroadcast8}, ${hbroadcast8}`,
                                );
                                gameeight.setAuthor(
                                    `Game ID: ${gameid8}`,
                                );
                                gameeight.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                    gamesix,
                                    gameseven,
                                    gameeight,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 9) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                let visitingteam6 = data.games[5].vTeam.triCode.toLocaleString();
                                let hometeam6 = data.games[5].hTeam.triCode.toLocaleString();
                                let vteamscore6 = data.games[5].vTeam.score.toLocaleString();
                                let hteamscore6 = data.games[5].hTeam.score.toLocaleString();
                                let period6 = data.games[5].period.current.toLocaleString();
                                let time6 = data.games[5].startTimeEastern.toLocaleString();
                                let gameid6 = data.games[5].gameId.toLocaleString();
                                let gameover6 = data.games[5].isRecapArticleAvail.toLocaleString();
                                let arena6 = data.games[5].arena.name.toLocaleString();
                                let location6 = data.games[5].arena.city.toLocaleString();
                                let hwins6 = data.games[5].hTeam.win.toLocaleString();
                                let hloss6 = data.games[5].hTeam.loss.toLocaleString();
                                let vwins6 = data.games[5].vTeam.win.toLocaleString();
                                let vloss6 = data.games[5].vTeam.loss.toLocaleString();
                                let vbroadcast6 = data.games[5].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast6 = data.games[5].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock6 = data.games[5].clock.toLocaleString();
                                let halftime6 = data.games[5].period.isHalftime.toLocaleString();
                                let periodend6 = data.games[5].period.isEndOfPeriod.toLocaleString();

                                let visitingteam7 = data.games[6].vTeam.triCode.toLocaleString();
                                let hometeam7 = data.games[6].hTeam.triCode.toLocaleString();
                                let vteamscore7 = data.games[6].vTeam.score.toLocaleString();
                                let hteamscore7 = data.games[6].hTeam.score.toLocaleString();
                                let period7 = data.games[6].period.current.toLocaleString();
                                let time7 = data.games[6].startTimeEastern.toLocaleString();
                                let gameid7 = data.games[6].gameId.toLocaleString();
                                let gameover7 = data.games[6].isRecapArticleAvail.toLocaleString();
                                let arena7 = data.games[6].arena.name.toLocaleString();
                                let location7 = data.games[6].arena.city.toLocaleString();
                                let hwins7 = data.games[6].hTeam.win.toLocaleString();
                                let hloss7 = data.games[6].hTeam.loss.toLocaleString();
                                let vwins7 = data.games[6].vTeam.win.toLocaleString();
                                let vloss7 = data.games[6].vTeam.loss.toLocaleString();
                                let vbroadcast7 = data.games[6].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast7 = data.games[6].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock7 = data.games[6].clock.toLocaleString();
                                let halftime7 = data.games[6].period.isHalftime.toLocaleString();
                                let periodend7 = data.games[6].period.isEndOfPeriod.toLocaleString();

                                let visitingteam8 = data.games[7].vTeam.triCode.toLocaleString();
                                let hometeam8 = data.games[7].hTeam.triCode.toLocaleString();
                                let vteamscore8 = data.games[7].vTeam.score.toLocaleString();
                                let hteamscore8 = data.games[7].hTeam.score.toLocaleString();
                                let period8 = data.games[7].period.current.toLocaleString();
                                let time8 = data.games[7].startTimeEastern.toLocaleString();
                                let gameid8 = data.games[7].gameId.toLocaleString();
                                let gameover8 = data.games[7].isRecapArticleAvail.toLocaleString();
                                let arena8 = data.games[7].arena.name.toLocaleString();
                                let location8 = data.games[7].arena.city.toLocaleString();
                                let hwins8 = data.games[7].hTeam.win.toLocaleString();
                                let hloss8 = data.games[7].hTeam.loss.toLocaleString();
                                let vwins8 = data.games[7].vTeam.win.toLocaleString();
                                let vloss8 = data.games[7].vTeam.loss.toLocaleString();
                                let vbroadcast8 = data.games[7].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast8 = data.games[7].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock8 = data.games[7].clock.toLocaleString();
                                let halftime8 = data.games[7].period.isHalftime.toLocaleString();
                                let periodend8 = data.games[7].period.isEndOfPeriod.toLocaleString();

                                let visitingteam9 = data.games[8].vTeam.triCode.toLocaleString();
                                let hometeam9 = data.games[8].hTeam.triCode.toLocaleString();
                                let vteamscore9 = data.games[8].vTeam.score.toLocaleString();
                                let hteamscore9 = data.games[8].hTeam.score.toLocaleString();
                                let period9 = data.games[8].period.current.toLocaleString();
                                let time9 = data.games[8].startTimeEastern.toLocaleString();
                                let gameid9 = data.games[8].gameId.toLocaleString();
                                let gameover9 = data.games[8].isRecapArticleAvail.toLocaleString();
                                let arena9 = data.games[8].arena.name.toLocaleString();
                                let location9 = data.games[8].arena.city.toLocaleString();
                                let hwins9 = data.games[8].hTeam.win.toLocaleString();
                                let hloss9 = data.games[8].hTeam.loss.toLocaleString();
                                let vwins9 = data.games[8].vTeam.win.toLocaleString();
                                let vloss9 = data.games[8].vTeam.loss.toLocaleString();
                                let vbroadcast9 = data.games[8].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast9 = data.games[8].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock9 = data.games[8].clock.toLocaleString();
                                let halftime9 = data.games[8].period.isHalftime.toLocaleString();
                                let periodend9 = data.games[8].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const gamesix = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam6} @ ${hometeam6}`,
                                    )
                                    .setDescription(
                                        `In ${arena6}, ${location6}`,
                                    );
                                if (gameover6 !== 'false') {
                                    gamesix.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamesix.addField(
                                        `Tip Off @`,
                                        time6,
                                    );
                                }
                                gamesix.addFields(
                                    {
                                        name: `${teamLogo[visitingteam6]}  ${visitingteam6} \`${vwins6} - ${vloss6}\``,
                                        value: `${vteamscore6} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam6]}  ${hometeam6} \`${hwins6} - ${hloss6}\``,
                                        value: `${hteamscore6} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    periodend6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `End of Q${period6}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'true' &&
                                    periodend6 !== 'true'
                                ) {
                                    gamesix.addField(
                                        `🔴 Q${period6} - ${clock6}`,
                                        '_ _',
                                    );
                                }
                                gamesix.addField(
                                    `Broadcasters`,
                                    `${vbroadcast6}, ${hbroadcast6}`,
                                );
                                gamesix.setAuthor(
                                    `Game ID: ${gameid6}`,
                                );
                                gamesix.setTimestamp();

                                const gameseven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam7} @ ${hometeam7}`,
                                    )
                                    .setDescription(
                                        `In ${arena7}, ${location7}`,
                                    );
                                if (gameover7 !== 'false') {
                                    gameseven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameseven.addField(
                                        `Tip Off @`,
                                        time7,
                                    );
                                }
                                gameseven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam7]}  ${visitingteam7} \`${vwins7} - ${vloss7}\``,
                                        value: `${vteamscore7} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam7]}  ${hometeam7} \`${hwins7} - ${hloss7}\``,
                                        value: `${hteamscore7} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    periodend7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `End of Q${period7}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'true' &&
                                    periodend7 !== 'true'
                                ) {
                                    gameseven.addField(
                                        `🔴 Q${period7} - ${clock7}`,
                                        '_ _',
                                    );
                                }
                                gameseven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast7}, ${hbroadcast7}`,
                                );
                                gameseven.setAuthor(
                                    `Game ID: ${gameid7}`,
                                );
                                gameseven.setTimestamp();

                                const gameeight = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam8} @ ${hometeam8}`,
                                    )
                                    .setDescription(
                                        `In ${arena8}, ${location8}`,
                                    );
                                if (gameover8 !== 'false') {
                                    gameeight.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeight.addField(
                                        `Tip Off @`,
                                        time8,
                                    );
                                }
                                gameeight.addFields(
                                    {
                                        name: `${teamLogo[visitingteam8]}  ${visitingteam8} \`${vwins8} - ${vloss8}\``,
                                        value: `${vteamscore8} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam8]}  ${hometeam8} \`${hwins8} - ${hloss8}\``,
                                        value: `${hteamscore8} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    periodend8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `End of Q${period8}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'true' &&
                                    periodend8 !== 'true'
                                ) {
                                    gameeight.addField(
                                        `🔴 Q${period8} - ${clock8}`,
                                        '_ _',
                                    );
                                }
                                gameeight.addField(
                                    `Broadcasters`,
                                    `${vbroadcast8}, ${hbroadcast8}`,
                                );
                                gameeight.setAuthor(
                                    `Game ID: ${gameid8}`,
                                );
                                gameeight.setTimestamp();

                                const gamenine = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam9} @ ${hometeam9}`,
                                    )
                                    .setDescription(
                                        `In ${arena9}, ${location9}`,
                                    );
                                if (gameover9 !== 'false') {
                                    gamenine.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamenine.addField(
                                        `Tip Off @`,
                                        time9,
                                    );
                                }
                                gamenine.addFields(
                                    {
                                        name: `${teamLogo[visitingteam9]}  ${visitingteam9} \`${vwins9} - ${vloss9}\``,
                                        value: `${vteamscore9} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam9]}  ${hometeam9} \`${hwins9} - ${hloss9}\``,
                                        value: `${hteamscore9} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    periodend9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `End of Q${period9}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'true' &&
                                    periodend9 !== 'true'
                                ) {
                                    gamenine.addField(
                                        `🔴 Q${period9} - ${clock9}`,
                                        '_ _',
                                    );
                                }
                                gamenine.addField(
                                    `Broadcasters`,
                                    `${vbroadcast9}, ${hbroadcast9}`,
                                );
                                gamenine.setAuthor(
                                    `Game ID: ${gameid9}`,
                                );
                                gamenine.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                    gamesix,
                                    gameseven,
                                    gameeight,
                                    gamenine,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 10) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                let visitingteam6 = data.games[5].vTeam.triCode.toLocaleString();
                                let hometeam6 = data.games[5].hTeam.triCode.toLocaleString();
                                let vteamscore6 = data.games[5].vTeam.score.toLocaleString();
                                let hteamscore6 = data.games[5].hTeam.score.toLocaleString();
                                let period6 = data.games[5].period.current.toLocaleString();
                                let time6 = data.games[5].startTimeEastern.toLocaleString();
                                let gameid6 = data.games[5].gameId.toLocaleString();
                                let gameover6 = data.games[5].isRecapArticleAvail.toLocaleString();
                                let arena6 = data.games[5].arena.name.toLocaleString();
                                let location6 = data.games[5].arena.city.toLocaleString();
                                let hwins6 = data.games[5].hTeam.win.toLocaleString();
                                let hloss6 = data.games[5].hTeam.loss.toLocaleString();
                                let vwins6 = data.games[5].vTeam.win.toLocaleString();
                                let vloss6 = data.games[5].vTeam.loss.toLocaleString();
                                let vbroadcast6 = data.games[5].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast6 = data.games[5].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock6 = data.games[5].clock.toLocaleString();
                                let halftime6 = data.games[5].period.isHalftime.toLocaleString();
                                let periodend6 = data.games[5].period.isEndOfPeriod.toLocaleString();

                                let visitingteam7 = data.games[6].vTeam.triCode.toLocaleString();
                                let hometeam7 = data.games[6].hTeam.triCode.toLocaleString();
                                let vteamscore7 = data.games[6].vTeam.score.toLocaleString();
                                let hteamscore7 = data.games[6].hTeam.score.toLocaleString();
                                let period7 = data.games[6].period.current.toLocaleString();
                                let time7 = data.games[6].startTimeEastern.toLocaleString();
                                let gameid7 = data.games[6].gameId.toLocaleString();
                                let gameover7 = data.games[6].isRecapArticleAvail.toLocaleString();
                                let arena7 = data.games[6].arena.name.toLocaleString();
                                let location7 = data.games[6].arena.city.toLocaleString();
                                let hwins7 = data.games[6].hTeam.win.toLocaleString();
                                let hloss7 = data.games[6].hTeam.loss.toLocaleString();
                                let vwins7 = data.games[6].vTeam.win.toLocaleString();
                                let vloss7 = data.games[6].vTeam.loss.toLocaleString();
                                let vbroadcast7 = data.games[6].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast7 = data.games[6].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock7 = data.games[6].clock.toLocaleString();
                                let halftime7 = data.games[6].period.isHalftime.toLocaleString();
                                let periodend7 = data.games[6].period.isEndOfPeriod.toLocaleString();

                                let visitingteam8 = data.games[7].vTeam.triCode.toLocaleString();
                                let hometeam8 = data.games[7].hTeam.triCode.toLocaleString();
                                let vteamscore8 = data.games[7].vTeam.score.toLocaleString();
                                let hteamscore8 = data.games[7].hTeam.score.toLocaleString();
                                let period8 = data.games[7].period.current.toLocaleString();
                                let time8 = data.games[7].startTimeEastern.toLocaleString();
                                let gameid8 = data.games[7].gameId.toLocaleString();
                                let gameover8 = data.games[7].isRecapArticleAvail.toLocaleString();
                                let arena8 = data.games[7].arena.name.toLocaleString();
                                let location8 = data.games[7].arena.city.toLocaleString();
                                let hwins8 = data.games[7].hTeam.win.toLocaleString();
                                let hloss8 = data.games[7].hTeam.loss.toLocaleString();
                                let vwins8 = data.games[7].vTeam.win.toLocaleString();
                                let vloss8 = data.games[7].vTeam.loss.toLocaleString();
                                let vbroadcast8 = data.games[7].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast8 = data.games[7].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock8 = data.games[7].clock.toLocaleString();
                                let halftime8 = data.games[7].period.isHalftime.toLocaleString();
                                let periodend8 = data.games[7].period.isEndOfPeriod.toLocaleString();

                                let visitingteam9 = data.games[8].vTeam.triCode.toLocaleString();
                                let hometeam9 = data.games[8].hTeam.triCode.toLocaleString();
                                let vteamscore9 = data.games[8].vTeam.score.toLocaleString();
                                let hteamscore9 = data.games[8].hTeam.score.toLocaleString();
                                let period9 = data.games[8].period.current.toLocaleString();
                                let time9 = data.games[8].startTimeEastern.toLocaleString();
                                let gameid9 = data.games[8].gameId.toLocaleString();
                                let gameover9 = data.games[8].isRecapArticleAvail.toLocaleString();
                                let arena9 = data.games[8].arena.name.toLocaleString();
                                let location9 = data.games[8].arena.city.toLocaleString();
                                let hwins9 = data.games[8].hTeam.win.toLocaleString();
                                let hloss9 = data.games[8].hTeam.loss.toLocaleString();
                                let vwins9 = data.games[8].vTeam.win.toLocaleString();
                                let vloss9 = data.games[8].vTeam.loss.toLocaleString();
                                let vbroadcast9 = data.games[8].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast9 = data.games[8].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock9 = data.games[8].clock.toLocaleString();
                                let halftime9 = data.games[8].period.isHalftime.toLocaleString();
                                let periodend9 = data.games[8].period.isEndOfPeriod.toLocaleString();

                                let visitingteam10 = data.games[9].vTeam.triCode.toLocaleString();
                                let hometeam10 = data.games[9].hTeam.triCode.toLocaleString();
                                let vteamscore10 = data.games[9].vTeam.score.toLocaleString();
                                let hteamscore10 = data.games[9].hTeam.score.toLocaleString();
                                let period10 = data.games[9].period.current.toLocaleString();
                                let time10 = data.games[9].startTimeEastern.toLocaleString();
                                let gameid10 = data.games[9].gameId.toLocaleString();
                                let gameover10 = data.games[9].isRecapArticleAvail.toLocaleString();
                                let arena10 = data.games[9].arena.name.toLocaleString();
                                let location10 = data.games[9].arena.city.toLocaleString();
                                let hwins10 = data.games[9].hTeam.win.toLocaleString();
                                let hloss10 = data.games[9].hTeam.loss.toLocaleString();
                                let vwins10 = data.games[9].vTeam.win.toLocaleString();
                                let vloss10 = data.games[9].vTeam.loss.toLocaleString();
                                let vbroadcast10 = data.games[9].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast10 = data.games[9].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock10 = data.games[9].clock.toLocaleString();
                                let halftime10 = data.games[9].period.isHalftime.toLocaleString();
                                let periodend10 = data.games[9].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const gamesix = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam6} @ ${hometeam6}`,
                                    )
                                    .setDescription(
                                        `In ${arena6}, ${location6}`,
                                    );
                                if (gameover6 !== 'false') {
                                    gamesix.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamesix.addField(
                                        `Tip Off @`,
                                        time6,
                                    );
                                }
                                gamesix.addFields(
                                    {
                                        name: `${teamLogo[visitingteam6]}  ${visitingteam6} \`${vwins6} - ${vloss6}\``,
                                        value: `${vteamscore6} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam6]}  ${hometeam6} \`${hwins6} - ${hloss6}\``,
                                        value: `${hteamscore6} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    periodend6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `End of Q${period6}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'true' &&
                                    periodend6 !== 'true'
                                ) {
                                    gamesix.addField(
                                        `🔴 Q${period6} - ${clock6}`,
                                        '_ _',
                                    );
                                }
                                gamesix.addField(
                                    `Broadcasters`,
                                    `${vbroadcast6}, ${hbroadcast6}`,
                                );
                                gamesix.setAuthor(
                                    `Game ID: ${gameid6}`,
                                );
                                gamesix.setTimestamp();

                                const gameseven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam7} @ ${hometeam7}`,
                                    )
                                    .setDescription(
                                        `In ${arena7}, ${location7}`,
                                    );
                                if (gameover7 !== 'false') {
                                    gameseven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameseven.addField(
                                        `Tip Off @`,
                                        time7,
                                    );
                                }
                                gameseven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam7]}  ${visitingteam7} \`${vwins7} - ${vloss7}\``,
                                        value: `${vteamscore7} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam7]}  ${hometeam7} \`${hwins7} - ${hloss7}\``,
                                        value: `${hteamscore7} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    periodend7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `End of Q${period7}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'true' &&
                                    periodend7 !== 'true'
                                ) {
                                    gameseven.addField(
                                        `🔴 Q${period7} - ${clock7}`,
                                        '_ _',
                                    );
                                }
                                gameseven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast7}, ${hbroadcast7}`,
                                );
                                gameseven.setAuthor(
                                    `Game ID: ${gameid7}`,
                                );
                                gameseven.setTimestamp();

                                const gameeight = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam8} @ ${hometeam8}`,
                                    )
                                    .setDescription(
                                        `In ${arena8}, ${location8}`,
                                    );
                                if (gameover8 !== 'false') {
                                    gameeight.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeight.addField(
                                        `Tip Off @`,
                                        time8,
                                    );
                                }
                                gameeight.addFields(
                                    {
                                        name: `${teamLogo[visitingteam8]}  ${visitingteam8} \`${vwins8} - ${vloss8}\``,
                                        value: `${vteamscore8} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam8]}  ${hometeam8} \`${hwins8} - ${hloss8}\``,
                                        value: `${hteamscore8} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    periodend8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `End of Q${period8}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'true' &&
                                    periodend8 !== 'true'
                                ) {
                                    gameeight.addField(
                                        `🔴 Q${period8} - ${clock8}`,
                                        '_ _',
                                    );
                                }
                                gameeight.addField(
                                    `Broadcasters`,
                                    `${vbroadcast8}, ${hbroadcast8}`,
                                );
                                gameeight.setAuthor(
                                    `Game ID: ${gameid8}`,
                                );
                                gameeight.setTimestamp();

                                const gamenine = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam9} @ ${hometeam9}`,
                                    )
                                    .setDescription(
                                        `In ${arena9}, ${location9}`,
                                    );
                                if (gameover9 !== 'false') {
                                    gamenine.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamenine.addField(
                                        `Tip Off @`,
                                        time9,
                                    );
                                }
                                gamenine.addFields(
                                    {
                                        name: `${teamLogo[visitingteam9]}  ${visitingteam9} \`${vwins9} - ${vloss9}\``,
                                        value: `${vteamscore9} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam9]}  ${hometeam9} \`${hwins9} - ${hloss9}\``,
                                        value: `${hteamscore9} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    periodend9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `End of Q${period9}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'true' &&
                                    periodend9 !== 'true'
                                ) {
                                    gamenine.addField(
                                        `🔴 Q${period9} - ${clock9}`,
                                        '_ _',
                                    );
                                }
                                gamenine.addField(
                                    `Broadcasters`,
                                    `${vbroadcast9}, ${hbroadcast9}`,
                                );
                                gamenine.setAuthor(
                                    `Game ID: ${gameid9}`,
                                );
                                gamenine.setTimestamp();

                                const gameten = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam10} @ ${hometeam10}`,
                                    )
                                    .setDescription(
                                        `In ${arena10}, ${location10}`,
                                    );
                                if (gameover10 !== 'false') {
                                    gameten.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameten.addField(
                                        `Tip Off @`,
                                        time10,
                                    );
                                }
                                gameten.addFields(
                                    {
                                        name: `${teamLogo[visitingteam10]}  ${visitingteam10} \`${vwins10} - ${vloss10}\``,
                                        value: `${vteamscore10} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam10]}  ${hometeam10} \`${hwins10} - ${hloss10}\``,
                                        value: `${hteamscore10} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    periodend10 !== 'false'
                                ) {
                                    gameten.addField(
                                        `End of Q${period10}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    halftime10 !== 'false'
                                ) {
                                    gameten.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    halftime10 !== 'true' &&
                                    periodend10 !== 'true'
                                ) {
                                    gameten.addField(
                                        `🔴 Q${period10} - ${clock10}`,
                                        '_ _',
                                    );
                                }
                                gameten.addField(
                                    `Broadcasters`,
                                    `${vbroadcast10}, ${hbroadcast10}`,
                                );
                                gameten.setAuthor(
                                    `Game ID: ${gameid10}`,
                                );
                                gameten.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                    gamesix,
                                    gameseven,
                                    gameeight,
                                    gamenine,
                                    gameten,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 11) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                let visitingteam6 = data.games[5].vTeam.triCode.toLocaleString();
                                let hometeam6 = data.games[5].hTeam.triCode.toLocaleString();
                                let vteamscore6 = data.games[5].vTeam.score.toLocaleString();
                                let hteamscore6 = data.games[5].hTeam.score.toLocaleString();
                                let period6 = data.games[5].period.current.toLocaleString();
                                let time6 = data.games[5].startTimeEastern.toLocaleString();
                                let gameid6 = data.games[5].gameId.toLocaleString();
                                let gameover6 = data.games[5].isRecapArticleAvail.toLocaleString();
                                let arena6 = data.games[5].arena.name.toLocaleString();
                                let location6 = data.games[5].arena.city.toLocaleString();
                                let hwins6 = data.games[5].hTeam.win.toLocaleString();
                                let hloss6 = data.games[5].hTeam.loss.toLocaleString();
                                let vwins6 = data.games[5].vTeam.win.toLocaleString();
                                let vloss6 = data.games[5].vTeam.loss.toLocaleString();
                                let vbroadcast6 = data.games[5].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast6 = data.games[5].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock6 = data.games[5].clock.toLocaleString();
                                let halftime6 = data.games[5].period.isHalftime.toLocaleString();
                                let periodend6 = data.games[5].period.isEndOfPeriod.toLocaleString();

                                let visitingteam7 = data.games[6].vTeam.triCode.toLocaleString();
                                let hometeam7 = data.games[6].hTeam.triCode.toLocaleString();
                                let vteamscore7 = data.games[6].vTeam.score.toLocaleString();
                                let hteamscore7 = data.games[6].hTeam.score.toLocaleString();
                                let period7 = data.games[6].period.current.toLocaleString();
                                let time7 = data.games[6].startTimeEastern.toLocaleString();
                                let gameid7 = data.games[6].gameId.toLocaleString();
                                let gameover7 = data.games[6].isRecapArticleAvail.toLocaleString();
                                let arena7 = data.games[6].arena.name.toLocaleString();
                                let location7 = data.games[6].arena.city.toLocaleString();
                                let hwins7 = data.games[6].hTeam.win.toLocaleString();
                                let hloss7 = data.games[6].hTeam.loss.toLocaleString();
                                let vwins7 = data.games[6].vTeam.win.toLocaleString();
                                let vloss7 = data.games[6].vTeam.loss.toLocaleString();
                                let vbroadcast7 = data.games[6].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast7 = data.games[6].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock7 = data.games[6].clock.toLocaleString();
                                let halftime7 = data.games[6].period.isHalftime.toLocaleString();
                                let periodend7 = data.games[6].period.isEndOfPeriod.toLocaleString();

                                let visitingteam8 = data.games[7].vTeam.triCode.toLocaleString();
                                let hometeam8 = data.games[7].hTeam.triCode.toLocaleString();
                                let vteamscore8 = data.games[7].vTeam.score.toLocaleString();
                                let hteamscore8 = data.games[7].hTeam.score.toLocaleString();
                                let period8 = data.games[7].period.current.toLocaleString();
                                let time8 = data.games[7].startTimeEastern.toLocaleString();
                                let gameid8 = data.games[7].gameId.toLocaleString();
                                let gameover8 = data.games[7].isRecapArticleAvail.toLocaleString();
                                let arena8 = data.games[7].arena.name.toLocaleString();
                                let location8 = data.games[7].arena.city.toLocaleString();
                                let hwins8 = data.games[7].hTeam.win.toLocaleString();
                                let hloss8 = data.games[7].hTeam.loss.toLocaleString();
                                let vwins8 = data.games[7].vTeam.win.toLocaleString();
                                let vloss8 = data.games[7].vTeam.loss.toLocaleString();
                                let vbroadcast8 = data.games[7].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast8 = data.games[7].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock8 = data.games[7].clock.toLocaleString();
                                let halftime8 = data.games[7].period.isHalftime.toLocaleString();
                                let periodend8 = data.games[7].period.isEndOfPeriod.toLocaleString();

                                let visitingteam9 = data.games[8].vTeam.triCode.toLocaleString();
                                let hometeam9 = data.games[8].hTeam.triCode.toLocaleString();
                                let vteamscore9 = data.games[8].vTeam.score.toLocaleString();
                                let hteamscore9 = data.games[8].hTeam.score.toLocaleString();
                                let period9 = data.games[8].period.current.toLocaleString();
                                let time9 = data.games[8].startTimeEastern.toLocaleString();
                                let gameid9 = data.games[8].gameId.toLocaleString();
                                let gameover9 = data.games[8].isRecapArticleAvail.toLocaleString();
                                let arena9 = data.games[8].arena.name.toLocaleString();
                                let location9 = data.games[8].arena.city.toLocaleString();
                                let hwins9 = data.games[8].hTeam.win.toLocaleString();
                                let hloss9 = data.games[8].hTeam.loss.toLocaleString();
                                let vwins9 = data.games[8].vTeam.win.toLocaleString();
                                let vloss9 = data.games[8].vTeam.loss.toLocaleString();
                                let vbroadcast9 = data.games[8].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast9 = data.games[8].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock9 = data.games[8].clock.toLocaleString();
                                let halftime9 = data.games[8].period.isHalftime.toLocaleString();
                                let periodend9 = data.games[8].period.isEndOfPeriod.toLocaleString();

                                let visitingteam10 = data.games[9].vTeam.triCode.toLocaleString();
                                let hometeam10 = data.games[9].hTeam.triCode.toLocaleString();
                                let vteamscore10 = data.games[9].vTeam.score.toLocaleString();
                                let hteamscore10 = data.games[9].hTeam.score.toLocaleString();
                                let period10 = data.games[9].period.current.toLocaleString();
                                let time10 = data.games[9].startTimeEastern.toLocaleString();
                                let gameid10 = data.games[9].gameId.toLocaleString();
                                let gameover10 = data.games[9].isRecapArticleAvail.toLocaleString();
                                let arena10 = data.games[9].arena.name.toLocaleString();
                                let location10 = data.games[9].arena.city.toLocaleString();
                                let hwins10 = data.games[9].hTeam.win.toLocaleString();
                                let hloss10 = data.games[9].hTeam.loss.toLocaleString();
                                let vwins10 = data.games[9].vTeam.win.toLocaleString();
                                let vloss10 = data.games[9].vTeam.loss.toLocaleString();
                                let vbroadcast10 = data.games[9].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast10 = data.games[9].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock10 = data.games[9].clock.toLocaleString();
                                let halftime10 = data.games[9].period.isHalftime.toLocaleString();
                                let periodend10 = data.games[9].period.isEndOfPeriod.toLocaleString();

                                let visitingteam11 = data.games[10].vTeam.triCode.toLocaleString();
                                let hometeam11 = data.games[10].hTeam.triCode.toLocaleString();
                                let vteamscore11 = data.games[10].vTeam.score.toLocaleString();
                                let hteamscore11 = data.games[10].hTeam.score.toLocaleString();
                                let period11 = data.games[10].period.current.toLocaleString();
                                let time11 = data.games[10].startTimeEastern.toLocaleString();
                                let gameid11 = data.games[10].gameId.toLocaleString();
                                let gameover11 = data.games[10].isRecapArticleAvail.toLocaleString();
                                let arena11 = data.games[10].arena.name.toLocaleString();
                                let location11 = data.games[10].arena.city.toLocaleString();
                                let hwins11 = data.games[10].hTeam.win.toLocaleString();
                                let hloss11 = data.games[10].hTeam.loss.toLocaleString();
                                let vwins11 = data.games[10].vTeam.win.toLocaleString();
                                let vloss11 = data.games[10].vTeam.loss.toLocaleString();
                                let vbroadcast11 = data.games[10].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast11 = data.games[10].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock11 = data.games[10].clock.toLocaleString();
                                let halftime11 = data.games[10].period.isHalftime.toLocaleString();
                                let periodend11 = data.games[10].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const gamesix = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam6} @ ${hometeam6}`,
                                    )
                                    .setDescription(
                                        `In ${arena6}, ${location6}`,
                                    );
                                if (gameover6 !== 'false') {
                                    gamesix.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamesix.addField(
                                        `Tip Off @`,
                                        time6,
                                    );
                                }
                                gamesix.addFields(
                                    {
                                        name: `${teamLogo[visitingteam6]}  ${visitingteam6} \`${vwins6} - ${vloss6}\``,
                                        value: `${vteamscore6} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam6]}  ${hometeam6} \`${hwins6} - ${hloss6}\``,
                                        value: `${hteamscore6} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    periodend6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `End of Q${period6}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'true' &&
                                    periodend6 !== 'true'
                                ) {
                                    gamesix.addField(
                                        `🔴 Q${period6} - ${clock6}`,
                                        '_ _',
                                    );
                                }
                                gamesix.addField(
                                    `Broadcasters`,
                                    `${vbroadcast6}, ${hbroadcast6}`,
                                );
                                gamesix.setAuthor(
                                    `Game ID: ${gameid6}`,
                                );
                                gamesix.setTimestamp();

                                const gameseven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam7} @ ${hometeam7}`,
                                    )
                                    .setDescription(
                                        `In ${arena7}, ${location7}`,
                                    );
                                if (gameover7 !== 'false') {
                                    gameseven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameseven.addField(
                                        `Tip Off @`,
                                        time7,
                                    );
                                }
                                gameseven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam7]}  ${visitingteam7} \`${vwins7} - ${vloss7}\``,
                                        value: `${vteamscore7} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam7]}  ${hometeam7} \`${hwins7} - ${hloss7}\``,
                                        value: `${hteamscore7} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    periodend7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `End of Q${period7}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'true' &&
                                    periodend7 !== 'true'
                                ) {
                                    gameseven.addField(
                                        `🔴 Q${period7} - ${clock7}`,
                                        '_ _',
                                    );
                                }
                                gameseven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast7}, ${hbroadcast7}`,
                                );
                                gameseven.setAuthor(
                                    `Game ID: ${gameid7}`,
                                );
                                gameseven.setTimestamp();

                                const gameeight = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam8} @ ${hometeam8}`,
                                    )
                                    .setDescription(
                                        `In ${arena8}, ${location8}`,
                                    );
                                if (gameover8 !== 'false') {
                                    gameeight.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeight.addField(
                                        `Tip Off @`,
                                        time8,
                                    );
                                }
                                gameeight.addFields(
                                    {
                                        name: `${teamLogo[visitingteam8]}  ${visitingteam8} \`${vwins8} - ${vloss8}\``,
                                        value: `${vteamscore8} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam8]}  ${hometeam8} \`${hwins8} - ${hloss8}\``,
                                        value: `${hteamscore8} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    periodend8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `End of Q${period8}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'true' &&
                                    periodend8 !== 'true'
                                ) {
                                    gameeight.addField(
                                        `🔴 Q${period8} - ${clock8}`,
                                        '_ _',
                                    );
                                }
                                gameeight.addField(
                                    `Broadcasters`,
                                    `${vbroadcast8}, ${hbroadcast8}`,
                                );
                                gameeight.setAuthor(
                                    `Game ID: ${gameid8}`,
                                );
                                gameeight.setTimestamp();

                                const gamenine = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam9} @ ${hometeam9}`,
                                    )
                                    .setDescription(
                                        `In ${arena9}, ${location9}`,
                                    );
                                if (gameover9 !== 'false') {
                                    gamenine.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamenine.addField(
                                        `Tip Off @`,
                                        time9,
                                    );
                                }
                                gamenine.addFields(
                                    {
                                        name: `${teamLogo[visitingteam9]}  ${visitingteam9} \`${vwins9} - ${vloss9}\``,
                                        value: `${vteamscore9} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam9]}  ${hometeam9} \`${hwins9} - ${hloss9}\``,
                                        value: `${hteamscore9} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    periodend9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `End of Q${period9}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'true' &&
                                    periodend9 !== 'true'
                                ) {
                                    gamenine.addField(
                                        `🔴 Q${period9} - ${clock9}`,
                                        '_ _',
                                    );
                                }
                                gamenine.addField(
                                    `Broadcasters`,
                                    `${vbroadcast9}, ${hbroadcast9}`,
                                );
                                gamenine.setAuthor(
                                    `Game ID: ${gameid9}`,
                                );
                                gamenine.setTimestamp();

                                const gameten = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam10} @ ${hometeam10}`,
                                    )
                                    .setDescription(
                                        `In ${arena10}, ${location10}`,
                                    );
                                if (gameover10 !== 'false') {
                                    gameten.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameten.addField(
                                        `Tip Off @`,
                                        time10,
                                    );
                                }
                                gameten.addFields(
                                    {
                                        name: `${teamLogo[visitingteam10]}  ${visitingteam10} \`${vwins10} - ${vloss10}\``,
                                        value: `${vteamscore10} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam10]}  ${hometeam10} \`${hwins10} - ${hloss10}\``,
                                        value: `${hteamscore10} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    periodend10 !== 'false'
                                ) {
                                    gameten.addField(
                                        `End of Q${period10}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    halftime10 !== 'false'
                                ) {
                                    gameten.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    halftime10 !== 'true' &&
                                    periodend10 !== 'true'
                                ) {
                                    gameten.addField(
                                        `🔴 Q${period10} - ${clock10}`,
                                        '_ _',
                                    );
                                }
                                gameten.addField(
                                    `Broadcasters`,
                                    `${vbroadcast10}, ${hbroadcast10}`,
                                );
                                gameten.setAuthor(
                                    `Game ID: ${gameid10}`,
                                );
                                gameten.setTimestamp();
                                const gameeleven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam11} @ ${hometeam11}`,
                                    )
                                    .setDescription(
                                        `In ${arena11}, ${location11}`,
                                    );
                                if (gameover11 !== 'false') {
                                    gameeleven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeleven.addField(
                                        `Tip Off @`,
                                        time11,
                                    );
                                }
                                gameeleven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam11]}  ${visitingteam11} \`${vwins11} - ${vloss11}\``,
                                        value: `${vteamscore11} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam11]}  ${hometeam11} \`${hwins11} - ${hloss11}\``,
                                        value: `${hteamscore11} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    periodend11 !== 'false'
                                ) {
                                    gameeleven.addField(
                                        `End of Q${period11}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    halftime11 !== 'false'
                                ) {
                                    gameeleven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    halftime11 !== 'true' &&
                                    periodend11 !== 'true'
                                ) {
                                    gameeleven.addField(
                                        `🔴 Q${period11} - ${clock11}`,
                                        '_ _',
                                    );
                                }
                                gameeleven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast11}, ${hbroadcast11}`,
                                );
                                gameeleven.setAuthor(
                                    `Game ID: ${gameid11}`,
                                );
                                gameeleven.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                    gamesix,
                                    gameseven,
                                    gameeight,
                                    gamenine,
                                    gameten,
                                    gameeleven,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 12) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                let visitingteam6 = data.games[5].vTeam.triCode.toLocaleString();
                                let hometeam6 = data.games[5].hTeam.triCode.toLocaleString();
                                let vteamscore6 = data.games[5].vTeam.score.toLocaleString();
                                let hteamscore6 = data.games[5].hTeam.score.toLocaleString();
                                let period6 = data.games[5].period.current.toLocaleString();
                                let time6 = data.games[5].startTimeEastern.toLocaleString();
                                let gameid6 = data.games[5].gameId.toLocaleString();
                                let gameover6 = data.games[5].isRecapArticleAvail.toLocaleString();
                                let arena6 = data.games[5].arena.name.toLocaleString();
                                let location6 = data.games[5].arena.city.toLocaleString();
                                let hwins6 = data.games[5].hTeam.win.toLocaleString();
                                let hloss6 = data.games[5].hTeam.loss.toLocaleString();
                                let vwins6 = data.games[5].vTeam.win.toLocaleString();
                                let vloss6 = data.games[5].vTeam.loss.toLocaleString();
                                let vbroadcast6 = data.games[5].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast6 = data.games[5].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock6 = data.games[5].clock.toLocaleString();
                                let halftime6 = data.games[5].period.isHalftime.toLocaleString();
                                let periodend6 = data.games[5].period.isEndOfPeriod.toLocaleString();

                                let visitingteam7 = data.games[6].vTeam.triCode.toLocaleString();
                                let hometeam7 = data.games[6].hTeam.triCode.toLocaleString();
                                let vteamscore7 = data.games[6].vTeam.score.toLocaleString();
                                let hteamscore7 = data.games[6].hTeam.score.toLocaleString();
                                let period7 = data.games[6].period.current.toLocaleString();
                                let time7 = data.games[6].startTimeEastern.toLocaleString();
                                let gameid7 = data.games[6].gameId.toLocaleString();
                                let gameover7 = data.games[6].isRecapArticleAvail.toLocaleString();
                                let arena7 = data.games[6].arena.name.toLocaleString();
                                let location7 = data.games[6].arena.city.toLocaleString();
                                let hwins7 = data.games[6].hTeam.win.toLocaleString();
                                let hloss7 = data.games[6].hTeam.loss.toLocaleString();
                                let vwins7 = data.games[6].vTeam.win.toLocaleString();
                                let vloss7 = data.games[6].vTeam.loss.toLocaleString();
                                let vbroadcast7 = data.games[6].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast7 = data.games[6].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock7 = data.games[6].clock.toLocaleString();
                                let halftime7 = data.games[6].period.isHalftime.toLocaleString();
                                let periodend7 = data.games[6].period.isEndOfPeriod.toLocaleString();

                                let visitingteam8 = data.games[7].vTeam.triCode.toLocaleString();
                                let hometeam8 = data.games[7].hTeam.triCode.toLocaleString();
                                let vteamscore8 = data.games[7].vTeam.score.toLocaleString();
                                let hteamscore8 = data.games[7].hTeam.score.toLocaleString();
                                let period8 = data.games[7].period.current.toLocaleString();
                                let time8 = data.games[7].startTimeEastern.toLocaleString();
                                let gameid8 = data.games[7].gameId.toLocaleString();
                                let gameover8 = data.games[7].isRecapArticleAvail.toLocaleString();
                                let arena8 = data.games[7].arena.name.toLocaleString();
                                let location8 = data.games[7].arena.city.toLocaleString();
                                let hwins8 = data.games[7].hTeam.win.toLocaleString();
                                let hloss8 = data.games[7].hTeam.loss.toLocaleString();
                                let vwins8 = data.games[7].vTeam.win.toLocaleString();
                                let vloss8 = data.games[7].vTeam.loss.toLocaleString();
                                let vbroadcast8 = data.games[7].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast8 = data.games[7].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock8 = data.games[7].clock.toLocaleString();
                                let halftime8 = data.games[7].period.isHalftime.toLocaleString();
                                let periodend8 = data.games[7].period.isEndOfPeriod.toLocaleString();

                                let visitingteam9 = data.games[8].vTeam.triCode.toLocaleString();
                                let hometeam9 = data.games[8].hTeam.triCode.toLocaleString();
                                let vteamscore9 = data.games[8].vTeam.score.toLocaleString();
                                let hteamscore9 = data.games[8].hTeam.score.toLocaleString();
                                let period9 = data.games[8].period.current.toLocaleString();
                                let time9 = data.games[8].startTimeEastern.toLocaleString();
                                let gameid9 = data.games[8].gameId.toLocaleString();
                                let gameover9 = data.games[8].isRecapArticleAvail.toLocaleString();
                                let arena9 = data.games[8].arena.name.toLocaleString();
                                let location9 = data.games[8].arena.city.toLocaleString();
                                let hwins9 = data.games[8].hTeam.win.toLocaleString();
                                let hloss9 = data.games[8].hTeam.loss.toLocaleString();
                                let vwins9 = data.games[8].vTeam.win.toLocaleString();
                                let vloss9 = data.games[8].vTeam.loss.toLocaleString();
                                let vbroadcast9 = data.games[8].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast9 = data.games[8].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock9 = data.games[8].clock.toLocaleString();
                                let halftime9 = data.games[8].period.isHalftime.toLocaleString();
                                let periodend9 = data.games[8].period.isEndOfPeriod.toLocaleString();

                                let visitingteam10 = data.games[9].vTeam.triCode.toLocaleString();
                                let hometeam10 = data.games[9].hTeam.triCode.toLocaleString();
                                let vteamscore10 = data.games[9].vTeam.score.toLocaleString();
                                let hteamscore10 = data.games[9].hTeam.score.toLocaleString();
                                let period10 = data.games[9].period.current.toLocaleString();
                                let time10 = data.games[9].startTimeEastern.toLocaleString();
                                let gameid10 = data.games[9].gameId.toLocaleString();
                                let gameover10 = data.games[9].isRecapArticleAvail.toLocaleString();
                                let arena10 = data.games[9].arena.name.toLocaleString();
                                let location10 = data.games[9].arena.city.toLocaleString();
                                let hwins10 = data.games[9].hTeam.win.toLocaleString();
                                let hloss10 = data.games[9].hTeam.loss.toLocaleString();
                                let vwins10 = data.games[9].vTeam.win.toLocaleString();
                                let vloss10 = data.games[9].vTeam.loss.toLocaleString();
                                let vbroadcast10 = data.games[9].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast10 = data.games[9].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock10 = data.games[9].clock.toLocaleString();
                                let halftime10 = data.games[9].period.isHalftime.toLocaleString();
                                let periodend10 = data.games[9].period.isEndOfPeriod.toLocaleString();

                                let visitingteam11 = data.games[10].vTeam.triCode.toLocaleString();
                                let hometeam11 = data.games[10].hTeam.triCode.toLocaleString();
                                let vteamscore11 = data.games[10].vTeam.score.toLocaleString();
                                let hteamscore11 = data.games[10].hTeam.score.toLocaleString();
                                let period11 = data.games[10].period.current.toLocaleString();
                                let time11 = data.games[10].startTimeEastern.toLocaleString();
                                let gameid11 = data.games[10].gameId.toLocaleString();
                                let gameover11 = data.games[10].isRecapArticleAvail.toLocaleString();
                                let arena11 = data.games[10].arena.name.toLocaleString();
                                let location11 = data.games[10].arena.city.toLocaleString();
                                let hwins11 = data.games[10].hTeam.win.toLocaleString();
                                let hloss11 = data.games[10].hTeam.loss.toLocaleString();
                                let vwins11 = data.games[10].vTeam.win.toLocaleString();
                                let vloss11 = data.games[10].vTeam.loss.toLocaleString();
                                let vbroadcast11 = data.games[10].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast11 = data.games[10].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock11 = data.games[10].clock.toLocaleString();
                                let halftime11 = data.games[10].period.isHalftime.toLocaleString();
                                let periodend11 = data.games[10].period.isEndOfPeriod.toLocaleString();

                                let visitingteam12 = data.games[11].vTeam.triCode.toLocaleString();
                                let hometeam12 = data.games[11].hTeam.triCode.toLocaleString();
                                let vteamscore12 = data.games[11].vTeam.score.toLocaleString();
                                let hteamscore12 = data.games[11].hTeam.score.toLocaleString();
                                let period12 = data.games[11].period.current.toLocaleString();
                                let time12 = data.games[11].startTimeEastern.toLocaleString();
                                let gameid12 = data.games[11].gameId.toLocaleString();
                                let gameover12 = data.games[11].isRecapArticleAvail.toLocaleString();
                                let arena12 = data.games[11].arena.name.toLocaleString();
                                let location12 = data.games[11].arena.city.toLocaleString();
                                let hwins12 = data.games[11].hTeam.win.toLocaleString();
                                let hloss12 = data.games[11].hTeam.loss.toLocaleString();
                                let vwins12 = data.games[11].vTeam.win.toLocaleString();
                                let vloss12 = data.games[11].vTeam.loss.toLocaleString();
                                let vbroadcast12 = data.games[11].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast12 = data.games[11].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock12 = data.games[11].clock.toLocaleString();
                                let halftime12 = data.games[11].period.isHalftime.toLocaleString();
                                let periodend12 = data.games[11].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const gamesix = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam6} @ ${hometeam6}`,
                                    )
                                    .setDescription(
                                        `In ${arena6}, ${location6}`,
                                    );
                                if (gameover6 !== 'false') {
                                    gamesix.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamesix.addField(
                                        `Tip Off @`,
                                        time6,
                                    );
                                }
                                gamesix.addFields(
                                    {
                                        name: `${teamLogo[visitingteam6]}  ${visitingteam6} \`${vwins6} - ${vloss6}\``,
                                        value: `${vteamscore6} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam6]}  ${hometeam6} \`${hwins6} - ${hloss6}\``,
                                        value: `${hteamscore6} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    periodend6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `End of Q${period6}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'true' &&
                                    periodend6 !== 'true'
                                ) {
                                    gamesix.addField(
                                        `🔴 Q${period6} - ${clock6}`,
                                        '_ _',
                                    );
                                }
                                gamesix.addField(
                                    `Broadcasters`,
                                    `${vbroadcast6}, ${hbroadcast6}`,
                                );
                                gamesix.setAuthor(
                                    `Game ID: ${gameid6}`,
                                );
                                gamesix.setTimestamp();

                                const gameseven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam7} @ ${hometeam7}`,
                                    )
                                    .setDescription(
                                        `In ${arena7}, ${location7}`,
                                    );
                                if (gameover7 !== 'false') {
                                    gameseven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameseven.addField(
                                        `Tip Off @`,
                                        time7,
                                    );
                                }
                                gameseven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam7]}  ${visitingteam7} \`${vwins7} - ${vloss7}\``,
                                        value: `${vteamscore7} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam7]}  ${hometeam7} \`${hwins7} - ${hloss7}\``,
                                        value: `${hteamscore7} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    periodend7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `End of Q${period7}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'true' &&
                                    periodend7 !== 'true'
                                ) {
                                    gameseven.addField(
                                        `🔴 Q${period7} - ${clock7}`,
                                        '_ _',
                                    );
                                }
                                gameseven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast7}, ${hbroadcast7}`,
                                );
                                gameseven.setAuthor(
                                    `Game ID: ${gameid7}`,
                                );
                                gameseven.setTimestamp();

                                const gameeight = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam8} @ ${hometeam8}`,
                                    )
                                    .setDescription(
                                        `In ${arena8}, ${location8}`,
                                    );
                                if (gameover8 !== 'false') {
                                    gameeight.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeight.addField(
                                        `Tip Off @`,
                                        time8,
                                    );
                                }
                                gameeight.addFields(
                                    {
                                        name: `${teamLogo[visitingteam8]}  ${visitingteam8} \`${vwins8} - ${vloss8}\``,
                                        value: `${vteamscore8} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam8]}  ${hometeam8} \`${hwins8} - ${hloss8}\``,
                                        value: `${hteamscore8} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    periodend8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `End of Q${period8}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'true' &&
                                    periodend8 !== 'true'
                                ) {
                                    gameeight.addField(
                                        `🔴 Q${period8} - ${clock8}`,
                                        '_ _',
                                    );
                                }
                                gameeight.addField(
                                    `Broadcasters`,
                                    `${vbroadcast8}, ${hbroadcast8}`,
                                );
                                gameeight.setAuthor(
                                    `Game ID: ${gameid8}`,
                                );
                                gameeight.setTimestamp();

                                const gamenine = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam9} @ ${hometeam9}`,
                                    )
                                    .setDescription(
                                        `In ${arena9}, ${location9}`,
                                    );
                                if (gameover9 !== 'false') {
                                    gamenine.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamenine.addField(
                                        `Tip Off @`,
                                        time9,
                                    );
                                }
                                gamenine.addFields(
                                    {
                                        name: `${teamLogo[visitingteam9]}  ${visitingteam9} \`${vwins9} - ${vloss9}\``,
                                        value: `${vteamscore9} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam9]}  ${hometeam9} \`${hwins9} - ${hloss9}\``,
                                        value: `${hteamscore9} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    periodend9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `End of Q${period9}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'true' &&
                                    periodend9 !== 'true'
                                ) {
                                    gamenine.addField(
                                        `🔴 Q${period9} - ${clock9}`,
                                        '_ _',
                                    );
                                }
                                gamenine.addField(
                                    `Broadcasters`,
                                    `${vbroadcast9}, ${hbroadcast9}`,
                                );
                                gamenine.setAuthor(
                                    `Game ID: ${gameid9}`,
                                );
                                gamenine.setTimestamp();

                                const gameten = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam10} @ ${hometeam10}`,
                                    )
                                    .setDescription(
                                        `In ${arena10}, ${location10}`,
                                    );
                                if (gameover10 !== 'false') {
                                    gameten.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameten.addField(
                                        `Tip Off @`,
                                        time10,
                                    );
                                }
                                gameten.addFields(
                                    {
                                        name: `${teamLogo[visitingteam10]}  ${visitingteam10} \`${vwins10} - ${vloss10}\``,
                                        value: `${vteamscore10} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam10]}  ${hometeam10} \`${hwins10} - ${hloss10}\``,
                                        value: `${hteamscore10} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    periodend10 !== 'false'
                                ) {
                                    gameten.addField(
                                        `End of Q${period10}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    halftime10 !== 'false'
                                ) {
                                    gameten.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    halftime10 !== 'true' &&
                                    periodend10 !== 'true'
                                ) {
                                    gameten.addField(
                                        `🔴 Q${period10} - ${clock10}`,
                                        '_ _',
                                    );
                                }
                                gameten.addField(
                                    `Broadcasters`,
                                    `${vbroadcast10}, ${hbroadcast10}`,
                                );
                                gameten.setAuthor(
                                    `Game ID: ${gameid10}`,
                                );
                                gameten.setTimestamp();
                                const gameeleven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam11} @ ${hometeam11}`,
                                    )
                                    .setDescription(
                                        `In ${arena11}, ${location11}`,
                                    );
                                if (gameover11 !== 'false') {
                                    gameeleven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeleven.addField(
                                        `Tip Off @`,
                                        time11,
                                    );
                                }
                                gameeleven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam11]}  ${visitingteam11} \`${vwins11} - ${vloss11}\``,
                                        value: `${vteamscore11} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam11]}  ${hometeam11} \`${hwins11} - ${hloss11}\``,
                                        value: `${hteamscore11} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    periodend11 !== 'false'
                                ) {
                                    gameeleven.addField(
                                        `End of Q${period11}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    halftime11 !== 'false'
                                ) {
                                    gameeleven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    halftime11 !== 'true' &&
                                    periodend11 !== 'true'
                                ) {
                                    gameeleven.addField(
                                        `🔴 Q${period11} - ${clock11}`,
                                        '_ _',
                                    );
                                }
                                gameeleven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast11}, ${hbroadcast11}`,
                                );
                                gameeleven.setAuthor(
                                    `Game ID: ${gameid11}`,
                                );
                                gameeleven.setTimestamp();

                                const gametwelve = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam12} @ ${hometeam12}`,
                                    )
                                    .setDescription(
                                        `In ${arena12}, ${location12}`,
                                    );
                                if (gameover12 !== 'false') {
                                    gametwelve.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwelve.addField(
                                        `Tip Off @`,
                                        time12,
                                    );
                                }
                                gametwelve.addFields(
                                    {
                                        name: `${teamLogo[visitingteam12]}  ${visitingteam12} \`${vwins12} - ${vloss12}\``,
                                        value: `${vteamscore12} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam12]}  ${hometeam12} \`${hwins12} - ${hloss12}\``,
                                        value: `${hteamscore12} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover12 !== 'true' &&
                                    period12 > 0 &&
                                    periodend12 !== 'false'
                                ) {
                                    gametwelve.addField(
                                        `End of Q${period12}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover12 !== 'true' &&
                                    period12 > 0 &&
                                    halftime12 !== 'false'
                                ) {
                                    gametwelve.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover12 !== 'true' &&
                                    period12 > 0 &&
                                    halftime12 !== 'true' &&
                                    periodend12 !== 'true'
                                ) {
                                    gametwelve.addField(
                                        `🔴 Q${period12} - ${clock12}`,
                                        '_ _',
                                    );
                                }
                                gametwelve.addField(
                                    `Broadcasters`,
                                    `${vbroadcast12}, ${hbroadcast12}`,
                                );
                                gametwelve.setAuthor(
                                    `Game ID: ${gameid12}`,
                                );
                                gametwelve.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                    gamesix,
                                    gameseven,
                                    gameeight,
                                    gamenine,
                                    gameten,
                                    gameeleven,
                                    gametwelve,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                            if (gameamount == 13) {
                                let visitingteam = data.games[0].vTeam.triCode.toLocaleString();
                                let hometeam = data.games[0].hTeam.triCode.toLocaleString();
                                let vteamscore = data.games[0].vTeam.score.toLocaleString();
                                let hteamscore = data.games[0].hTeam.score.toLocaleString();
                                let period = data.games[0].period.current.toLocaleString();
                                let time = data.games[0].startTimeEastern.toLocaleString();
                                let gameid = data.games[0].gameId.toLocaleString();
                                let gameover = data.games[0].isRecapArticleAvail.toLocaleString();
                                let arena = data.games[0].arena.name.toLocaleString();
                                let location = data.games[0].arena.city.toLocaleString();
                                let hwins = data.games[0].hTeam.win.toLocaleString();
                                let hloss = data.games[0].hTeam.loss.toLocaleString();
                                let vwins = data.games[0].vTeam.win.toLocaleString();
                                let vloss = data.games[0].vTeam.loss.toLocaleString();
                                let vbroadcast = data.games[0].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast = data.games[0].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock = data.games[0].clock.toLocaleString();
                                let halftime = data.games[0].period.isHalftime.toLocaleString();
                                let periodend = data.games[0].period.isEndOfPeriod.toLocaleString();

                                let visitingteam2 = data.games[1].vTeam.triCode.toLocaleString();
                                let hometeam2 = data.games[1].hTeam.triCode.toLocaleString();
                                let vteamscore2 = data.games[1].vTeam.score.toLocaleString();
                                let hteamscore2 = data.games[1].hTeam.score.toLocaleString();
                                let period2 = data.games[1].period.current.toLocaleString();
                                let time2 = data.games[1].startTimeEastern.toLocaleString();
                                let gameid2 = data.games[1].gameId.toLocaleString();
                                let gameover2 = data.games[1].isRecapArticleAvail.toLocaleString();
                                let arena2 = data.games[1].arena.name.toLocaleString();
                                let location2 = data.games[1].arena.city.toLocaleString();
                                let hwins2 = data.games[1].hTeam.win.toLocaleString();
                                let hloss2 = data.games[1].hTeam.loss.toLocaleString();
                                let vwins2 = data.games[1].vTeam.win.toLocaleString();
                                let vloss2 = data.games[1].vTeam.loss.toLocaleString();
                                let vbroadcast2 = data.games[1].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast2 = data.games[1].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock2 = data.games[1].clock.toLocaleString();
                                let halftime2 = data.games[1].period.isHalftime.toLocaleString();
                                let periodend2 = data.games[1].period.isEndOfPeriod.toLocaleString();

                                let visitingteam3 = data.games[2].vTeam.triCode.toLocaleString();
                                let hometeam3 = data.games[2].hTeam.triCode.toLocaleString();
                                let vteamscore3 = data.games[2].vTeam.score.toLocaleString();
                                let hteamscore3 = data.games[2].hTeam.score.toLocaleString();
                                let period3 = data.games[2].period.current.toLocaleString();
                                let time3 = data.games[2].startTimeEastern.toLocaleString();
                                let gameid3 = data.games[2].gameId.toLocaleString();
                                let gameover3 = data.games[2].isRecapArticleAvail.toLocaleString();
                                let arena3 = data.games[2].arena.name.toLocaleString();
                                let location3 = data.games[2].arena.city.toLocaleString();
                                let hwins3 = data.games[2].hTeam.win.toLocaleString();
                                let hloss3 = data.games[2].hTeam.loss.toLocaleString();
                                let vwins3 = data.games[2].vTeam.win.toLocaleString();
                                let vloss3 = data.games[2].vTeam.loss.toLocaleString();
                                let vbroadcast3 = data.games[2].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast3 = data.games[2].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock3 = data.games[2].clock.toLocaleString();
                                let halftime3 = data.games[2].period.isHalftime.toLocaleString();
                                let periodend3 = data.games[2].period.isEndOfPeriod.toLocaleString();

                                let visitingteam4 = data.games[3].vTeam.triCode.toLocaleString();
                                let hometeam4 = data.games[3].hTeam.triCode.toLocaleString();
                                let vteamscore4 = data.games[3].vTeam.score.toLocaleString();
                                let hteamscore4 = data.games[3].hTeam.score.toLocaleString();
                                let period4 = data.games[3].period.current.toLocaleString();
                                let time4 = data.games[3].startTimeEastern.toLocaleString();
                                let gameid4 = data.games[3].gameId.toLocaleString();
                                let gameover4 = data.games[3].isRecapArticleAvail.toLocaleString();
                                let arena4 = data.games[3].arena.name.toLocaleString();
                                let location4 = data.games[3].arena.city.toLocaleString();
                                let hwins4 = data.games[3].hTeam.win.toLocaleString();
                                let hloss4 = data.games[3].hTeam.loss.toLocaleString();
                                let vwins4 = data.games[3].vTeam.win.toLocaleString();
                                let vloss4 = data.games[3].vTeam.loss.toLocaleString();
                                let vbroadcast4 = data.games[3].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast4 = data.games[3].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock4 = data.games[3].clock.toLocaleString();
                                let halftime4 = data.games[3].period.isHalftime.toLocaleString();
                                let periodend4 = data.games[3].period.isEndOfPeriod.toLocaleString();

                                let visitingteam5 = data.games[4].vTeam.triCode.toLocaleString();
                                let hometeam5 = data.games[4].hTeam.triCode.toLocaleString();
                                let vteamscore5 = data.games[4].vTeam.score.toLocaleString();
                                let hteamscore5 = data.games[4].hTeam.score.toLocaleString();
                                let period5 = data.games[4].period.current.toLocaleString();
                                let time5 = data.games[4].startTimeEastern.toLocaleString();
                                let gameid5 = data.games[4].gameId.toLocaleString();
                                let gameover5 = data.games[4].isRecapArticleAvail.toLocaleString();
                                let arena5 = data.games[4].arena.name.toLocaleString();
                                let location5 = data.games[4].arena.city.toLocaleString();
                                let hwins5 = data.games[4].hTeam.win.toLocaleString();
                                let hloss5 = data.games[4].hTeam.loss.toLocaleString();
                                let vwins5 = data.games[4].vTeam.win.toLocaleString();
                                let vloss5 = data.games[4].vTeam.loss.toLocaleString();
                                let vbroadcast5 = data.games[4].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast5 = data.games[4].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock5 = data.games[4].clock.toLocaleString();
                                let halftime5 = data.games[4].period.isHalftime.toLocaleString();
                                let periodend5 = data.games[4].period.isEndOfPeriod.toLocaleString();

                                let visitingteam6 = data.games[5].vTeam.triCode.toLocaleString();
                                let hometeam6 = data.games[5].hTeam.triCode.toLocaleString();
                                let vteamscore6 = data.games[5].vTeam.score.toLocaleString();
                                let hteamscore6 = data.games[5].hTeam.score.toLocaleString();
                                let period6 = data.games[5].period.current.toLocaleString();
                                let time6 = data.games[5].startTimeEastern.toLocaleString();
                                let gameid6 = data.games[5].gameId.toLocaleString();
                                let gameover6 = data.games[5].isRecapArticleAvail.toLocaleString();
                                let arena6 = data.games[5].arena.name.toLocaleString();
                                let location6 = data.games[5].arena.city.toLocaleString();
                                let hwins6 = data.games[5].hTeam.win.toLocaleString();
                                let hloss6 = data.games[5].hTeam.loss.toLocaleString();
                                let vwins6 = data.games[5].vTeam.win.toLocaleString();
                                let vloss6 = data.games[5].vTeam.loss.toLocaleString();
                                let vbroadcast6 = data.games[5].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                //let hbroadcast6 = data.games[5].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock6 = data.games[5].clock.toLocaleString();
                                let halftime6 = data.games[5].period.isHalftime.toLocaleString();
                                let periodend6 = data.games[5].period.isEndOfPeriod.toLocaleString();

                                let visitingteam7 = data.games[6].vTeam.triCode.toLocaleString();
                                let hometeam7 = data.games[6].hTeam.triCode.toLocaleString();
                                let vteamscore7 = data.games[6].vTeam.score.toLocaleString();
                                let hteamscore7 = data.games[6].hTeam.score.toLocaleString();
                                let period7 = data.games[6].period.current.toLocaleString();
                                let time7 = data.games[6].startTimeEastern.toLocaleString();
                                let gameid7 = data.games[6].gameId.toLocaleString();
                                let gameover7 = data.games[6].isRecapArticleAvail.toLocaleString();
                                let arena7 = data.games[6].arena.name.toLocaleString();
                                let location7 = data.games[6].arena.city.toLocaleString();
                                let hwins7 = data.games[6].hTeam.win.toLocaleString();
                                let hloss7 = data.games[6].hTeam.loss.toLocaleString();
                                let vwins7 = data.games[6].vTeam.win.toLocaleString();
                                let vloss7 = data.games[6].vTeam.loss.toLocaleString();
                                let vbroadcast7 = data.games[6].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast7 = data.games[6].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock7 = data.games[6].clock.toLocaleString();
                                let halftime7 = data.games[6].period.isHalftime.toLocaleString();
                                let periodend7 = data.games[6].period.isEndOfPeriod.toLocaleString();

                                let visitingteam8 = data.games[7].vTeam.triCode.toLocaleString();
                                let hometeam8 = data.games[7].hTeam.triCode.toLocaleString();
                                let vteamscore8 = data.games[7].vTeam.score.toLocaleString();
                                let hteamscore8 = data.games[7].hTeam.score.toLocaleString();
                                let period8 = data.games[7].period.current.toLocaleString();
                                let time8 = data.games[7].startTimeEastern.toLocaleString();
                                let gameid8 = data.games[7].gameId.toLocaleString();
                                let gameover8 = data.games[7].isRecapArticleAvail.toLocaleString();
                                let arena8 = data.games[7].arena.name.toLocaleString();
                                let location8 = data.games[7].arena.city.toLocaleString();
                                let hwins8 = data.games[7].hTeam.win.toLocaleString();
                                let hloss8 = data.games[7].hTeam.loss.toLocaleString();
                                let vwins8 = data.games[7].vTeam.win.toLocaleString();
                                let vloss8 = data.games[7].vTeam.loss.toLocaleString();
                                let vbroadcast8 = data.games[7].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast8 = data.games[7].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock8 = data.games[7].clock.toLocaleString();
                                let halftime8 = data.games[7].period.isHalftime.toLocaleString();
                                let periodend8 = data.games[7].period.isEndOfPeriod.toLocaleString();

                                let visitingteam9 = data.games[8].vTeam.triCode.toLocaleString();
                                let hometeam9 = data.games[8].hTeam.triCode.toLocaleString();
                                let vteamscore9 = data.games[8].vTeam.score.toLocaleString();
                                let hteamscore9 = data.games[8].hTeam.score.toLocaleString();
                                let period9 = data.games[8].period.current.toLocaleString();
                                let time9 = data.games[8].startTimeEastern.toLocaleString();
                                let gameid9 = data.games[8].gameId.toLocaleString();
                                let gameover9 = data.games[8].isRecapArticleAvail.toLocaleString();
                                let arena9 = data.games[8].arena.name.toLocaleString();
                                let location9 = data.games[8].arena.city.toLocaleString();
                                let hwins9 = data.games[8].hTeam.win.toLocaleString();
                                let hloss9 = data.games[8].hTeam.loss.toLocaleString();
                                let vwins9 = data.games[8].vTeam.win.toLocaleString();
                                let vloss9 = data.games[8].vTeam.loss.toLocaleString();
                                let vbroadcast9 = data.games[8].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast9 = data.games[8].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock9 = data.games[8].clock.toLocaleString();
                                let halftime9 = data.games[8].period.isHalftime.toLocaleString();
                                let periodend9 = data.games[8].period.isEndOfPeriod.toLocaleString();

                                let visitingteam10 = data.games[9].vTeam.triCode.toLocaleString();
                                let hometeam10 = data.games[9].hTeam.triCode.toLocaleString();
                                let vteamscore10 = data.games[9].vTeam.score.toLocaleString();
                                let hteamscore10 = data.games[9].hTeam.score.toLocaleString();
                                let period10 = data.games[9].period.current.toLocaleString();
                                let time10 = data.games[9].startTimeEastern.toLocaleString();
                                let gameid10 = data.games[9].gameId.toLocaleString();
                                let gameover10 = data.games[9].isRecapArticleAvail.toLocaleString();
                                let arena10 = data.games[9].arena.name.toLocaleString();
                                let location10 = data.games[9].arena.city.toLocaleString();
                                let hwins10 = data.games[9].hTeam.win.toLocaleString();
                                let hloss10 = data.games[9].hTeam.loss.toLocaleString();
                                let vwins10 = data.games[9].vTeam.win.toLocaleString();
                                let vloss10 = data.games[9].vTeam.loss.toLocaleString();
                                let vbroadcast10 = data.games[9].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast10 = data.games[9].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock10 = data.games[9].clock.toLocaleString();
                                let halftime10 = data.games[9].period.isHalftime.toLocaleString();
                                let periodend10 = data.games[9].period.isEndOfPeriod.toLocaleString();

                                let visitingteam11 = data.games[10].vTeam.triCode.toLocaleString();
                                let hometeam11 = data.games[10].hTeam.triCode.toLocaleString();
                                let vteamscore11 = data.games[10].vTeam.score.toLocaleString();
                                let hteamscore11 = data.games[10].hTeam.score.toLocaleString();
                                let period11 = data.games[10].period.current.toLocaleString();
                                let time11 = data.games[10].startTimeEastern.toLocaleString();
                                let gameid11 = data.games[10].gameId.toLocaleString();
                                let gameover11 = data.games[10].isRecapArticleAvail.toLocaleString();
                                let arena11 = data.games[10].arena.name.toLocaleString();
                                let location11 = data.games[10].arena.city.toLocaleString();
                                let hwins11 = data.games[10].hTeam.win.toLocaleString();
                                let hloss11 = data.games[10].hTeam.loss.toLocaleString();
                                let vwins11 = data.games[10].vTeam.win.toLocaleString();
                                let vloss11 = data.games[10].vTeam.loss.toLocaleString();
                                let vbroadcast11 = data.games[10].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast11 = data.games[10].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock11 = data.games[10].clock.toLocaleString();
                                let halftime11 = data.games[10].period.isHalftime.toLocaleString();
                                let periodend11 = data.games[10].period.isEndOfPeriod.toLocaleString();

                                let visitingteam12 = data.games[11].vTeam.triCode.toLocaleString();
                                let hometeam12 = data.games[11].hTeam.triCode.toLocaleString();
                                let vteamscore12 = data.games[11].vTeam.score.toLocaleString();
                                let hteamscore12 = data.games[11].hTeam.score.toLocaleString();
                                let period12 = data.games[11].period.current.toLocaleString();
                                let time12 = data.games[11].startTimeEastern.toLocaleString();
                                let gameid12 = data.games[11].gameId.toLocaleString();
                                let gameover12 = data.games[11].isRecapArticleAvail.toLocaleString();
                                let arena12 = data.games[11].arena.name.toLocaleString();
                                let location12 = data.games[11].arena.city.toLocaleString();
                                let hwins12 = data.games[11].hTeam.win.toLocaleString();
                                let hloss12 = data.games[11].hTeam.loss.toLocaleString();
                                let vwins12 = data.games[11].vTeam.win.toLocaleString();
                                let vloss12 = data.games[11].vTeam.loss.toLocaleString();
                                let vbroadcast12 = data.games[11].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast12 = data.games[11].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock12 = data.games[11].clock.toLocaleString();
                                let halftime12 = data.games[11].period.isHalftime.toLocaleString();
                                let periodend12 = data.games[11].period.isEndOfPeriod.toLocaleString();

                                let visitingteam13 = data.games[12].vTeam.triCode.toLocaleString();
                                let hometeam13 = data.games[12].hTeam.triCode.toLocaleString();
                                let vteamscore13 = data.games[12].vTeam.score.toLocaleString();
                                let hteamscore13 = data.games[12].hTeam.score.toLocaleString();
                                let period13 = data.games[12].period.current.toLocaleString();
                                let time13 = data.games[12].startTimeEastern.toLocaleString();
                                let gameid13 = data.games[12].gameId.toLocaleString();
                                let gameover13 = data.games[12].isRecapArticleAvail.toLocaleString();
                                let arena13 = data.games[12].arena.name.toLocaleString();
                                let location13 = data.games[12].arena.city.toLocaleString();
                                let hwins13 = data.games[12].hTeam.win.toLocaleString();
                                let hloss13 = data.games[12].hTeam.loss.toLocaleString();
                                let vwins13 = data.games[12].vTeam.win.toLocaleString();
                                let vloss13 = data.games[12].vTeam.loss.toLocaleString();
                                let vbroadcast13 = data.games[12].watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast13 = data.games[12].watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();
                                let clock13 = data.games[12].clock.toLocaleString();
                                let halftime13 = data.games[12].period.isHalftime.toLocaleString();
                                let periodend13 = data.games[12].period.isEndOfPeriod.toLocaleString();

                                const start = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        'NBA Games Today <:NBA:803378368967344158>',
                                    )
                                    .setDescription(
                                        `There are ${gameamount} games today`,
                                    )
                                    .addField(
                                        `How to Use`,
                                        'Scroll through the game details with the emoji arrows below',
                                    );

                                const gameone = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam} @ ${hometeam}`,
                                    )
                                    .setDescription(
                                        `In ${arena}, ${location}`,
                                    );
                                if (gameover !== 'false') {
                                    gameone.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameone.addField(
                                        `Tip Off @`,
                                        time,
                                    );
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
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    gameone.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    gameone.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'true' &&
                                    periodend !== 'true'
                                ) {
                                    gameone.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                gameone.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                gameone.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                gameone.setTimestamp();

                                const gametwo = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam2} @ ${hometeam2}`,
                                    )
                                    .setDescription(
                                        `In ${arena2}, ${location2}`,
                                    );
                                if (gameover2 !== 'false') {
                                    gametwo.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwo.addField(
                                        `Tip Off @`,
                                        time2,
                                    );
                                }
                                gametwo.addFields(
                                    {
                                        name: `${teamLogo[visitingteam2]}  ${visitingteam2} \`${vwins2} - ${vloss2}\``,
                                        value: `${vteamscore2} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam2]}  ${hometeam2} \`${hwins2} - ${hloss2}\``,
                                        value: `${hteamscore2} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    periodend2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `End of Q${period2}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'false'
                                ) {
                                    gametwo.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover2 !== 'true' &&
                                    period2 > 0 &&
                                    halftime2 !== 'true' &&
                                    periodend2 !== 'true'
                                ) {
                                    gametwo.addField(
                                        `🔴 Q${period2} - ${clock2}`,
                                        '_ _',
                                    );
                                }
                                gametwo.addField(
                                    `Broadcasters`,
                                    `${vbroadcast2}, ${hbroadcast2}`,
                                );
                                gametwo.setAuthor(
                                    `Game ID: ${gameid2}`,
                                );
                                gametwo.setTimestamp();

                                const gamethree = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam3} @ ${hometeam3}`,
                                    )
                                    .setDescription(
                                        `In ${arena3}, ${location3}`,
                                    );
                                if (gameover3 !== 'false') {
                                    gamethree.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethree.addField(
                                        `Tip Off @`,
                                        time3,
                                    );
                                }
                                gamethree.addFields(
                                    {
                                        name: `${teamLogo[visitingteam3]}  ${visitingteam3} \`${vwins3} - ${vloss3}\``,
                                        value: `${vteamscore3} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam3]}  ${hometeam3} \`${hwins3} - ${hloss3}\``,
                                        value: `${hteamscore3} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    periodend3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `End of Q${period3}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'false'
                                ) {
                                    gamethree.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover3 !== 'true' &&
                                    period3 > 0 &&
                                    halftime3 !== 'true' &&
                                    periodend3 !== 'true'
                                ) {
                                    gamethree.addField(
                                        `🔴 Q${period3} - ${clock3}`,
                                        '_ _',
                                    );
                                }
                                gamethree.addField(
                                    `Broadcasters`,
                                    `${vbroadcast3}, ${hbroadcast3}`,
                                );
                                gamethree.setAuthor(
                                    `Game ID: ${gameid3}`,
                                );
                                gamethree.setTimestamp();

                                const gamefour = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam4} @ ${hometeam4}`,
                                    )
                                    .setDescription(
                                        `In ${arena4}, ${location4}`,
                                    );
                                if (gameover4 !== 'false') {
                                    gamefour.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefour.addField(
                                        `Tip Off @`,
                                        time4,
                                    );
                                }
                                gamefour.addFields(
                                    {
                                        name: `${teamLogo[visitingteam4]}  ${visitingteam4} \`${vwins4} - ${vloss4}\``,
                                        value: `${vteamscore4} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam4]}  ${hometeam4} \`${hwins4} - ${hloss4}\``,
                                        value: `${hteamscore4} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    periodend4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `End of Q${period4}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'false'
                                ) {
                                    gamefour.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover4 !== 'true' &&
                                    period4 > 0 &&
                                    halftime4 !== 'true' &&
                                    periodend4 !== 'true'
                                ) {
                                    gamefour.addField(
                                        `🔴 Q${period4} - ${clock4}`,
                                        '_ _',
                                    );
                                }
                                gamefour.addField(
                                    `Broadcasters`,
                                    `${vbroadcast4}, ${hbroadcast4}`,
                                );
                                gamefour.setAuthor(
                                    `Game ID: ${gameid4}`,
                                );
                                gamefour.setTimestamp();

                                const gamefive = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam5} @ ${hometeam5}`,
                                    )
                                    .setDescription(
                                        `In ${arena5}, ${location5}`,
                                    );
                                if (gameover5 !== 'false') {
                                    gamefive.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamefive.addField(
                                        'Tip Off @',
                                        time5,
                                    );
                                }
                                gamefive.addFields(
                                    {
                                        name: `${teamLogo[visitingteam5]}  ${visitingteam5} \`${vwins5} - ${vloss5}\``,
                                        value: `${vteamscore5} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam5]}  ${hometeam5} \`${hwins5} - ${hloss5}\``,
                                        value: `${hteamscore5} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    periodend5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `End of Q${period5}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'false'
                                ) {
                                    gamefive.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover5 !== 'true' &&
                                    period5 > 0 &&
                                    halftime5 !== 'true' &&
                                    periodend5 !== 'true'
                                ) {
                                    gamefive.addField(
                                        `🔴 Q${period5} - ${clock5}`,
                                        '_ _',
                                    );
                                }
                                gamefive.addField(
                                    `Broadcasters`,
                                    `${vbroadcast5}, ${hbroadcast5}`,
                                );
                                gamefive.setAuthor(
                                    `Game ID: ${gameid5}`,
                                );
                                gamefive.setTimestamp();

                                const gamesix = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam6} @ ${hometeam6}`,
                                    )
                                    .setDescription(
                                        `In ${arena6}, ${location6}`,
                                    );
                                if (gameover6 !== 'false') {
                                    gamesix.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamesix.addField(
                                        `Tip Off @`,
                                        time6,
                                    );
                                }
                                gamesix.addFields(
                                    {
                                        name: `${teamLogo[visitingteam6]}  ${visitingteam6} \`${vwins6} - ${vloss6}\``,
                                        value: `${vteamscore6} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam6]}  ${hometeam6} \`${hwins6} - ${hloss6}\``,
                                        value: `${hteamscore6} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    periodend6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `End of Q${period6}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'false'
                                ) {
                                    gamesix.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover6 !== 'true' &&
                                    period6 > 0 &&
                                    halftime6 !== 'true' &&
                                    periodend6 !== 'true'
                                ) {
                                    gamesix.addField(
                                        `🔴 Q${period6} - ${clock6}`,
                                        '_ _',
                                    );
                                }
                                gamesix.addField(
                                    `Broadcasters`,
                                    `${vbroadcast6}`, //, ${hbroadcast6},
                                );
                                gamesix.setAuthor(
                                    `Game ID: ${gameid6}`,
                                );
                                gamesix.setTimestamp();

                                const gameseven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam7} @ ${hometeam7}`,
                                    )
                                    .setDescription(
                                        `In ${arena7}, ${location7}`,
                                    );
                                if (gameover7 !== 'false') {
                                    gameseven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameseven.addField(
                                        `Tip Off @`,
                                        time7,
                                    );
                                }
                                gameseven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam7]}  ${visitingteam7} \`${vwins7} - ${vloss7}\``,
                                        value: `${vteamscore7} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam7]}  ${hometeam7} \`${hwins7} - ${hloss7}\``,
                                        value: `${hteamscore7} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    periodend7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `End of Q${period7}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'false'
                                ) {
                                    gameseven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover7 !== 'true' &&
                                    period7 > 0 &&
                                    halftime7 !== 'true' &&
                                    periodend7 !== 'true'
                                ) {
                                    gameseven.addField(
                                        `🔴 Q${period7} - ${clock7}`,
                                        '_ _',
                                    );
                                }
                                gameseven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast7}, ${hbroadcast7}`,
                                );
                                gameseven.setAuthor(
                                    `Game ID: ${gameid7}`,
                                );
                                gameseven.setTimestamp();

                                const gameeight = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam8} @ ${hometeam8}`,
                                    )
                                    .setDescription(
                                        `In ${arena8}, ${location8}`,
                                    );
                                if (gameover8 !== 'false') {
                                    gameeight.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeight.addField(
                                        `Tip Off @`,
                                        time8,
                                    );
                                }
                                gameeight.addFields(
                                    {
                                        name: `${teamLogo[visitingteam8]}  ${visitingteam8} \`${vwins8} - ${vloss8}\``,
                                        value: `${vteamscore8} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam8]}  ${hometeam8} \`${hwins8} - ${hloss8}\``,
                                        value: `${hteamscore8} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    periodend8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `End of Q${period8}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'false'
                                ) {
                                    gameeight.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover8 !== 'true' &&
                                    period8 > 0 &&
                                    halftime8 !== 'true' &&
                                    periodend8 !== 'true'
                                ) {
                                    gameeight.addField(
                                        `🔴 Q${period8} - ${clock8}`,
                                        '_ _',
                                    );
                                }
                                gameeight.addField(
                                    `Broadcasters`,
                                    `${vbroadcast8}, ${hbroadcast8}`,
                                );
                                gameeight.setAuthor(
                                    `Game ID: ${gameid8}`,
                                );
                                gameeight.setTimestamp();

                                const gamenine = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam9} @ ${hometeam9}`,
                                    )
                                    .setDescription(
                                        `In ${arena9}, ${location9}`,
                                    );
                                if (gameover9 !== 'false') {
                                    gamenine.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamenine.addField(
                                        `Tip Off @`,
                                        time9,
                                    );
                                }
                                gamenine.addFields(
                                    {
                                        name: `${teamLogo[visitingteam9]}  ${visitingteam9} \`${vwins9} - ${vloss9}\``,
                                        value: `${vteamscore9} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam9]}  ${hometeam9} \`${hwins9} - ${hloss9}\``,
                                        value: `${hteamscore9} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    periodend9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `End of Q${period9}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'false'
                                ) {
                                    gamenine.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover9 !== 'true' &&
                                    period9 > 0 &&
                                    halftime9 !== 'true' &&
                                    periodend9 !== 'true'
                                ) {
                                    gamenine.addField(
                                        `🔴 Q${period9} - ${clock9}`,
                                        '_ _',
                                    );
                                }
                                gamenine.addField(
                                    `Broadcasters`,
                                    `${vbroadcast9}, ${hbroadcast9}`,
                                );
                                gamenine.setAuthor(
                                    `Game ID: ${gameid9}`,
                                );
                                gamenine.setTimestamp();

                                const gameten = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam10} @ ${hometeam10}`,
                                    )
                                    .setDescription(
                                        `In ${arena10}, ${location10}`,
                                    );
                                if (gameover10 !== 'false') {
                                    gameten.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameten.addField(
                                        `Tip Off @`,
                                        time10,
                                    );
                                }
                                gameten.addFields(
                                    {
                                        name: `${teamLogo[visitingteam10]}  ${visitingteam10} \`${vwins10} - ${vloss10}\``,
                                        value: `${vteamscore10} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam10]}  ${hometeam10} \`${hwins10} - ${hloss10}\``,
                                        value: `${hteamscore10} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    periodend10 !== 'false'
                                ) {
                                    gameten.addField(
                                        `End of Q${period10}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    halftime10 !== 'false'
                                ) {
                                    gameten.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover10 !== 'true' &&
                                    period10 > 0 &&
                                    halftime10 !== 'true' &&
                                    periodend10 !== 'true'
                                ) {
                                    gameten.addField(
                                        `🔴 Q${period10} - ${clock10}`,
                                        '_ _',
                                    );
                                }
                                gameten.addField(
                                    `Broadcasters`,
                                    `${vbroadcast10}, ${hbroadcast10}`,
                                );
                                gameten.setAuthor(
                                    `Game ID: ${gameid10}`,
                                );
                                gameten.setTimestamp();
                                const gameeleven = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam11} @ ${hometeam11}`,
                                    )
                                    .setDescription(
                                        `In ${arena11}, ${location11}`,
                                    );
                                if (gameover11 !== 'false') {
                                    gameeleven.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gameeleven.addField(
                                        `Tip Off @`,
                                        time11,
                                    );
                                }
                                gameeleven.addFields(
                                    {
                                        name: `${teamLogo[visitingteam11]}  ${visitingteam11} \`${vwins11} - ${vloss11}\``,
                                        value: `${vteamscore11} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam11]}  ${hometeam11} \`${hwins11} - ${hloss11}\``,
                                        value: `${hteamscore11} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    periodend11 !== 'false'
                                ) {
                                    gameeleven.addField(
                                        `End of Q${period11}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    halftime11 !== 'false'
                                ) {
                                    gameeleven.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover11 !== 'true' &&
                                    period11 > 0 &&
                                    halftime11 !== 'true' &&
                                    periodend11 !== 'true'
                                ) {
                                    gameeleven.addField(
                                        `🔴 Q${period11} - ${clock11}`,
                                        '_ _',
                                    );
                                }
                                gameeleven.addField(
                                    `Broadcasters`,
                                    `${vbroadcast11}, ${hbroadcast11}`,
                                );
                                gameeleven.setAuthor(
                                    `Game ID: ${gameid11}`,
                                );
                                gameeleven.setTimestamp();

                                const gametwelve = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam12} @ ${hometeam12}`,
                                    )
                                    .setDescription(
                                        `In ${arena12}, ${location12}`,
                                    );
                                if (gameover12 !== 'false') {
                                    gametwelve.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gametwelve.addField(
                                        `Tip Off @`,
                                        time12,
                                    );
                                }
                                gametwelve.addFields(
                                    {
                                        name: `${teamLogo[visitingteam12]}  ${visitingteam12} \`${vwins12} - ${vloss12}\``,
                                        value: `${vteamscore12} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam12]}  ${hometeam12} \`${hwins12} - ${hloss12}\``,
                                        value: `${hteamscore12} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover12 !== 'true' &&
                                    period12 > 0 &&
                                    periodend12 !== 'false'
                                ) {
                                    gametwelve.addField(
                                        `End of Q${period12}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover12 !== 'true' &&
                                    period12 > 0 &&
                                    halftime12 !== 'false'
                                ) {
                                    gametwelve.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover12 !== 'true' &&
                                    period12 > 0 &&
                                    halftime12 !== 'true' &&
                                    periodend12 !== 'true'
                                ) {
                                    gametwelve.addField(
                                        `🔴 Q${period12} - ${clock12}`,
                                        '_ _',
                                    );
                                }
                                gametwelve.addField(
                                    `Broadcasters`,
                                    `${vbroadcast12}, ${hbroadcast12}`,
                                );
                                gametwelve.setAuthor(
                                    `Game ID: ${gameid12}`,
                                );
                                gametwelve.setTimestamp();

                                const gamethirteen = new Discord.MessageEmbed()
                                    .setColor('#535ded')
                                    .setTitle(
                                        `${visitingteam13} @ ${hometeam13}`,
                                    )
                                    .setDescription(
                                        `In ${arena13}, ${location13}`,
                                    );
                                if (gameover13 !== 'false') {
                                    gamethirteen.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    gamethirteen.addField(
                                        `Tip Off @`,
                                        time13,
                                    );
                                }
                                gamethirteen.addFields(
                                    {
                                        name: `${teamLogo[visitingteam13]}  ${visitingteam13} \`${vwins13} - ${vloss13}\``,
                                        value: `${vteamscore13} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hometeam13]}  ${hometeam13} \`${hwins13} - ${hloss13}\``,
                                        value: `${hteamscore13} PTS`,
                                        inline: true,
                                    },
                                );
                                if (
                                    gameover13 !== 'true' &&
                                    period13 > 0 &&
                                    periodend13 !== 'false'
                                ) {
                                    gamethirteen.addField(
                                        `End of Q${period13}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover13 !== 'true' &&
                                    period13 > 0 &&
                                    halftime13 !== 'false'
                                ) {
                                    gamethirteen.addField(
                                        `Halftime`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover13 !== 'true' &&
                                    period13 > 0 &&
                                    halftime13 !== 'true' &&
                                    periodend13 !== 'true'
                                ) {
                                    gamethirteen.addField(
                                        `🔴 Q${period13} - ${clock13}`,
                                        '_ _',
                                    );
                                }
                                gamethirteen.addField(
                                    `Broadcasters`,
                                    `${vbroadcast13}, ${hbroadcast13}`,
                                );
                                gamethirteen.setAuthor(
                                    `Game ID: ${gameid13}`,
                                );
                                gamethirteen.setTimestamp();

                                const pages = [
                                    start,
                                    gameone,
                                    gametwo,
                                    gamethree,
                                    gamefour,
                                    gamefive,
                                    gamesix,
                                    gameseven,
                                    gameeight,
                                    gamenine,
                                    gameten,
                                    gameeleven,
                                    gametwelve,
                                    gamethirteen,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    });
            });
    },
};
