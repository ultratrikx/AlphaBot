const fetch = require('node-fetch');

const pagination = require('discord.js-pagination');

module.exports = {
    name: 'nbagame',
    description: 'specific nba game details',

    async execute(client, message, args, Discord) {
        let gameid = args.join(' ');
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

        const noArgs = new Discord.MessageEmbed()
            .setTitle('Missing arguments')
            .setColor(0xff0000)
            .setDescription(
                "you're missing arguements, make sure to have your game id",
            )
            .setTimestamp();

        if (!args[0]) return message.channel.send(noArgs);

        if (args[0] === 'aFsdfasdfaf') {
            return;
        } else {
            fetch(`http://data.nba.net/10s/prod/v1/today.json`)
                .then((response) => response.json())
                .then((data) => {
                    data.links.currentDate.toLocaleString();
                    const date =
                        data.links.currentDate.toLocaleString();
                    fetch(
                        `http://data.nba.net/10s/prod/v1/${date}/${gameid}_boxscore.json`,
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            try {
                                let arena =
                                    data.basicGameData.arena.name.toLocaleString();
                                let city =
                                    data.basicGameData.arena.city.toLocaleString();
                                let state =
                                    data.basicGameData.arena.stateAbbr.toLocaleString();
                                let country =
                                    data.basicGameData.arena.country.toLocaleString();
                                let time =
                                    data.basicGameData.startTimeEastern.toLocaleString();

                                let clock =
                                    data.basicGameData.clock.toLocaleString();
                                let period =
                                    data.basicGameData.period.current.toLocaleString();
                                let halftime =
                                    data.basicGameData.period.isHalftime.toLocaleString();
                                let periodend =
                                    data.basicGameData.period.isEndOfPeriod.toLocaleString();
                                let gameover =
                                    data.basicGameData.isRecapArticleAvail.toLocaleString();

                                let attendence =
                                    data.basicGameData.attendance.toLocaleString();

                                let vteam =
                                    data.basicGameData.vTeam.triCode.toLocaleString();
                                let vwins =
                                    data.basicGameData.vTeam.win.toLocaleString();
                                let vloss =
                                    data.basicGameData.vTeam.loss.toLocaleString();
                                let vscore =
                                    data.basicGameData.vTeam.score.toLocaleString();
                                let vlinescore1 =
                                    data.basicGameData.vTeam.linescore[0].score.toLocaleString();
                                let vlinescore2 =
                                    data.basicGameData.vTeam.linescore[1].score.toLocaleString();
                                let vlinescore3 =
                                    data.basicGameData.vTeam.linescore[2].score.toLocaleString();
                                let vlinescore4 =
                                    data.basicGameData.vTeam.linescore[3].score.toLocaleString();

                                let hteam =
                                    data.basicGameData.hTeam.triCode.toLocaleString();
                                let hwins =
                                    data.basicGameData.hTeam.win.toLocaleString();
                                let hloss =
                                    data.basicGameData.hTeam.loss.toLocaleString();
                                let hscore =
                                    data.basicGameData.hTeam.score.toLocaleString();

                                let hlinescore1 =
                                    data.basicGameData.hTeam.linescore[0].score.toLocaleString();
                                let hlinescore2 =
                                    data.basicGameData.hTeam.linescore[1].score.toLocaleString();
                                let hlinescore3 =
                                    data.basicGameData.hTeam.linescore[2].score.toLocaleString();
                                let hlinescore4 =
                                    data.basicGameData.hTeam.linescore[3].score.toLocaleString();

                                let vbroadcast =
                                    data.basicGameData.watch.broadcast.broadcasters.vTeam[0].longName.toLocaleString();
                                let hbroadcast =
                                    data.basicGameData.watch.broadcast.broadcasters.hTeam[0].longName.toLocaleString();

                                let vfastbreak =
                                    data.stats.vTeam.fastBreakPoints.toLocaleString();
                                let vpinp =
                                    data.stats.vTeam.pointsInPaint.toLocaleString();
                                let vlead =
                                    data.stats.vTeam.biggestLead.toLocaleString();
                                let v2chance =
                                    data.stats.vTeam.secondChancePoints.toLocaleString();
                                let vpofft =
                                    data.stats.vTeam.pointsOffTurnovers.toLocaleString();
                                let vrun =
                                    data.stats.vTeam.longestRun.toLocaleString();

                                let vfgm =
                                    data.stats.vTeam.totals.fgm.toLocaleString();
                                let vfga =
                                    data.stats.vTeam.totals.fga.toLocaleString();
                                let vfgp =
                                    data.stats.vTeam.totals.fgp.toLocaleString();
                                let vfta =
                                    data.stats.vTeam.totals.fta.toLocaleString();
                                let vftm =
                                    data.stats.vTeam.totals.ftm.toLocaleString();
                                let vftp =
                                    data.stats.vTeam.totals.ftp.toLocaleString();
                                let vtpm =
                                    data.stats.vTeam.totals.tpm.toLocaleString();
                                let vtpa =
                                    data.stats.vTeam.totals.tpa.toLocaleString();
                                let vtpp =
                                    data.stats.vTeam.totals.tpp.toLocaleString();

                                let voffReb =
                                    data.stats.vTeam.totals.offReb.toLocaleString();
                                let vdefReb =
                                    data.stats.vTeam.totals.defReb.toLocaleString();
                                let vtotReb =
                                    data.stats.vTeam.totals.totReb.toLocaleString();

                                let vassists =
                                    data.stats.vTeam.totals.assists.toLocaleString();
                                let vpfouls =
                                    data.stats.vTeam.totals.pFouls.toLocaleString();
                                let vsteals =
                                    data.stats.vTeam.totals.steals.toLocaleString();
                                let vturnovers =
                                    data.stats.vTeam.totals.turnovers.toLocaleString();
                                let vblocks =
                                    data.stats.vTeam.totals.blocks.toLocaleString();

                                let vplead =
                                    data.stats.vTeam.leaders.points.value.toLocaleString();
                                let vpleaderf =
                                    data.stats.vTeam.leaders.points.players[0].firstName.toLocaleString();
                                let vpleaderl =
                                    data.stats.vTeam.leaders.points.players[0].lastName.toLocaleString();

                                let hfastbreak =
                                    data.stats.hTeam.fastBreakPoints.toLocaleString();
                                let hpinp =
                                    data.stats.hTeam.pointsInPaint.toLocaleString();
                                let hlead =
                                    data.stats.hTeam.biggestLead.toLocaleString();
                                let h2chance =
                                    data.stats.hTeam.secondChancePoints.toLocaleString();
                                let hpofft =
                                    data.stats.hTeam.pointsOffTurnovers.toLocaleString();
                                let hrun =
                                    data.stats.hTeam.longestRun.toLocaleString();

                                let hfgm =
                                    data.stats.hTeam.totals.fgm.toLocaleString();
                                let hfga =
                                    data.stats.hTeam.totals.fga.toLocaleString();
                                let hfgp =
                                    data.stats.hTeam.totals.fgp.toLocaleString();
                                let hfta =
                                    data.stats.hTeam.totals.fta.toLocaleString();
                                let hftm =
                                    data.stats.hTeam.totals.ftm.toLocaleString();
                                let hftp =
                                    data.stats.hTeam.totals.ftp.toLocaleString();
                                let htpm =
                                    data.stats.hTeam.totals.tpm.toLocaleString();
                                let htpa =
                                    data.stats.hTeam.totals.tpa.toLocaleString();
                                let htpp =
                                    data.stats.hTeam.totals.tpp.toLocaleString();

                                let hoffReb =
                                    data.stats.hTeam.totals.offReb.toLocaleString();
                                let hdefReb =
                                    data.stats.hTeam.totals.defReb.toLocaleString();
                                let htotReb =
                                    data.stats.hTeam.totals.totReb.toLocaleString();

                                let hassists =
                                    data.stats.hTeam.totals.assists.toLocaleString();
                                let hpfouls =
                                    data.stats.hTeam.totals.pFouls.toLocaleString();
                                let hsteals =
                                    data.stats.hTeam.totals.steals.toLocaleString();
                                let hturnovers =
                                    data.stats.hTeam.totals.turnovers.toLocaleString();
                                let hblocks =
                                    data.stats.hTeam.totals.blocks.toLocaleString();
                                let hplead =
                                    data.stats.hTeam.leaders.points.value.toLocaleString();
                                let hpleaderf =
                                    data.stats.hTeam.leaders.points.players[0].firstName.toLocaleString();
                                let hpleaderl =
                                    data.stats.hTeam.leaders.points.players[0].lastName.toLocaleString();

                                const overview =
                                    new Discord.MessageEmbed()
                                        .setColor('#535ded')
                                        .setTitle(
                                            `${vteam} @ ${hteam}`,
                                        )
                                        .setDescription(
                                            `${attendence} people attending the game at ${arena}, ${city}, ${state}, ${country}`,
                                        );
                                if (gameover !== 'false') {
                                    overview.addField(
                                        '**Final**',
                                        '_ _',
                                    );
                                } else {
                                    overview.addField(
                                        `Tip Off @`,
                                        time,
                                    );
                                }
                                overview.addFields(
                                    {
                                        name: `${teamLogo[vteam]}  ${vteam} \`${vwins} - ${vloss}\``,
                                        value: `${vscore} PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hteam]}  ${hteam} \`${hwins} - ${hloss}\``,
                                        value: `${hscore} PTS`,
                                        inline: true,
                                    },
                                );
                                overview.addField(
                                    `${vteam}`,
                                    `${vplead} PTS for ${vpleaderf} ${vpleaderl}`,
                                );
                                overview.addField(
                                    `${hteam}`,
                                    `${hplead} PTS for ${hpleaderf} ${hpleaderl}`,
                                );
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    periodend !== 'false'
                                ) {
                                    overview.addField(
                                        `End of Q${period}`,
                                        '_ _',
                                    );
                                }
                                if (
                                    gameover !== 'true' &&
                                    period > 0 &&
                                    halftime !== 'false'
                                ) {
                                    overview.addField(
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
                                    overview.addField(
                                        `🔴 Q${period} - ${clock}`,
                                        '_ _',
                                    );
                                }
                                overview.addField(
                                    `Broadcasters`,
                                    `${vbroadcast}, ${hbroadcast}`,
                                );
                                overview.setAuthor(
                                    `Game ID: ${gameid}`,
                                );
                                overview.setTimestamp();

                                const linescore =
                                    new Discord.MessageEmbed()
                                        .setTitle(`Linescore`)
                                        .setColor('#535ded')
                                        .addFields(
                                            {
                                                name: `${teamLogo[vteam]}  ${vteam} \`${vwins} - ${vloss}\``,
                                                value: `${vscore} PTS`,
                                                inline: true,
                                            },
                                            {
                                                name: `Quarter`,
                                                value: `PTS`,
                                                inline: true,
                                            },
                                            {
                                                name: `${teamLogo[hteam]}  ${hteam} \`${hwins} - ${hloss}\``,
                                                value: `${hscore} PTS`,
                                                inline: true,
                                            },
                                        );
                                linescore.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${vlinescore1}`,
                                        inline: true,
                                    },
                                    {
                                        name: `1st Quarter`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${hlinescore1}`,
                                        inline: true,
                                    },
                                );
                                linescore.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${vlinescore2}`,
                                        inline: true,
                                    },
                                    {
                                        name: `2nd Quarter`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${hlinescore2}`,
                                        inline: true,
                                    },
                                );
                                linescore.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${vlinescore3}`,
                                        inline: true,
                                    },
                                    {
                                        name: `3rd Quarter`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${hlinescore3}`,
                                        inline: true,
                                    },
                                );
                                linescore.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${vlinescore4}`,
                                        inline: true,
                                    },
                                    {
                                        name: `4th Quarter`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${hlinescore4}`,
                                        inline: true,
                                    },
                                );

                                const adstats =
                                    new Discord.MessageEmbed()
                                        .setTitle(`Stats`)
                                        .setColor('#535ded');
                                adstats.addFields(
                                    {
                                        name: `${vtotReb}`,
                                        value: `${voffReb}`,
                                        inline: true,
                                    },
                                    {
                                        name: `Total Rebounds`,
                                        value: `Off. Rebounds`,
                                        inline: true,
                                    },
                                    {
                                        name: `${htotReb}`,
                                        value: `${hoffReb}`,
                                        inline: true,
                                    },
                                );
                                adstats.addFields(
                                    {
                                        name: `${vassists}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `Assists`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `${hassists}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                );
                                adstats.addFields(
                                    {
                                        name: `${vblocks}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `Blocks`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `${hblocks}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                );
                                adstats.addFields(
                                    {
                                        name: `${vsteals}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `Steals`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `${hsteals}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                );
                                adstats.addFields(
                                    {
                                        name: `${vturnovers}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `Turnovers`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `${hturnovers}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                );
                                adstats.addFields(
                                    {
                                        name: `${vpinp}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `Points in Paint`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `${hpinp}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                );
                                adstats.addFields(
                                    {
                                        name: `${vpfouls}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `Personal Fouls`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `${hpfouls}`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                );

                                const stats =
                                    new Discord.MessageEmbed()
                                        .setTitle(`Stats`)
                                        .setColor('#535ded');
                                stats.addFields(
                                    {
                                        name: `${teamLogo[vteam]}`,
                                        value: `${vteam} \`${vwins} - ${vloss}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Teamstats`,
                                        value: `_ _`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hteam]}`,
                                        value: `${hteam} \`${hwins} - ${hloss}\``,
                                        inline: true,
                                    },
                                );
                                stats.addFields(
                                    {
                                        name: `${vfgm}/${vfga}`,
                                        value: `${vfgp}%`,
                                        inline: true,
                                    },
                                    {
                                        name: `Field Goals`,
                                        value: `    %`,
                                        inline: true,
                                    },
                                    {
                                        name: `${hfgm}/${hfga}`,
                                        value: `${hfgp}%`,
                                        inline: true,
                                    },
                                );
                                stats.addFields(
                                    {
                                        name: `${vtpm}/${vtpa}`,
                                        value: `${vtpp}%`,
                                        inline: true,
                                    },
                                    {
                                        name: `3 Pointers`,
                                        value: `    %`,
                                        inline: true,
                                    },
                                    {
                                        name: `${htpm}/${htpa}`,
                                        value: `${htpp}%`,
                                        inline: true,
                                    },
                                );
                                stats.addFields(
                                    {
                                        name: `${vftm}/${vfta}`,
                                        value: `${vftp}%`,
                                        inline: true,
                                    },
                                    {
                                        name: `Free Throws`,
                                        value: `    %`,
                                        inline: true,
                                    },
                                    {
                                        name: `${hftm}/${hfta}`,
                                        value: `${hftp}%`,
                                        inline: true,
                                    },
                                );

                                const extra =
                                    new Discord.MessageEmbed()
                                        .setTitle(`Stats`)
                                        .setColor('#535ded');
                                extra.addFields(
                                    {
                                        name: `${teamLogo[vteam]}  ${vteam} \`${vwins} - ${vloss}\``,
                                        value: `${vscore}`,
                                        inline: true,
                                    },
                                    {
                                        name: `Extra Stats`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `${teamLogo[hteam]}  ${hteam} \`${hwins} - ${hloss}\``,
                                        value: `${hscore}`,
                                        inline: true,
                                    },
                                );
                                extra.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${vfastbreak}`,
                                        inline: true,
                                    },
                                    {
                                        name: `Fast Break PTS`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${hfastbreak}`,
                                        inline: true,
                                    },
                                );
                                extra.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${vpofft}`,
                                        inline: true,
                                    },
                                    {
                                        name: `Points off Turnovers`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${hpofft}`,
                                        inline: true,
                                    },
                                );
                                extra.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${v2chance}`,
                                        inline: true,
                                    },
                                    {
                                        name: `Second Chance Points`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${h2chance}`,
                                        inline: true,
                                    },
                                );
                                extra.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${vrun}`,
                                        inline: true,
                                    },
                                    {
                                        name: `Largest Run`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${hrun}`,
                                        inline: true,
                                    },
                                );
                                extra.addFields(
                                    {
                                        name: `_ _`,
                                        value: `${vlead}`,
                                        inline: true,
                                    },
                                    {
                                        name: `Largest Lead`,
                                        value: `PTS`,
                                        inline: true,
                                    },
                                    {
                                        name: `_ _`,
                                        value: `${hlead}`,
                                        inline: true,
                                    },
                                );
                                const pages = [
                                    overview,
                                    linescore,
                                    stats,
                                    adstats,
                                    extra,
                                ];
                                const emojilist = ['⏪', '⏩'];
                                const timeout = '120000';

                                pagination(
                                    message,
                                    pages,
                                    emojilist,
                                    timeout,
                                );
                            } catch (err) {
                                console.log(err);
                            }
                        });
                });
        }
    },
};
