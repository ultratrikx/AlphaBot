const fetch = require('node-fetch');
const Discord = require('discord.js');
const pagination = require('discord.js-pagination');

module.exports = {
    name: 'a',
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
                        let numGames = data.numGames;
                        try {
                            console.log(gameamount);
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
                            for (i = 0; 0 < gameamount + 1; i++) {
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
                        } catch (err) {
                            console.log(err);
                        }
                    });
            });
    },
};
