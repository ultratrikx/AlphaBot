const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch');
const {pagination} = require('reconlx')


module.exports = {
    ...new SlashCommandBuilder()
        .setName('covid')
        .setDescription('gives you covid information per country')
        .addStringOption(option => 
            option
                .setName('country')
                .setDescription('input the country you want to view')
                .setRequired(false)
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let countries = interaction.options.getString('country')

        if (countries == 'all') {
            fetch(`https://covid19.mathdro.id/api`)
                .then((response) => response.json())
                .then((data) => {
                    let confirmed =
                        data.confirmed.value.toLocaleString();
                    let recovered =
                        data.recovered.value.toLocaleString();
                    let deaths = data.deaths.value.toLocaleString();
                    let graph = data.image.toLocaleString();
                    let confirmeds = data.confirmed.value;
                    let recovereds = data.recovered.value;
                    let deathss = data.deaths.value;
                    let active = (
                        confirmeds -
                        recovereds -
                        deathss
                    ).toLocaleString();

                    const embed = new MessageEmbed()
                        .setColor('#92b094')
                        .setImage(graph)
                        .setThumbnail(
                            'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                        )
                        .setTitle(`Worldwide COVID-19 Stats 🌎`)
                        .addField('Confirmed Cases', confirmed, '🦠')
                        .addField('Recovered', recovered, '🏥')
                        .addField('Deaths', deaths)
                        .addField('Active Cases', active)
                        .setDescription('Stay Safe 😷');

                    interaction.followUp({embeds: [embed]});
                });
     } else if (
            countries == 'can' ||
            'Can' ||
            'ca' ||
            'Ca' ||
            'CA' ||
            'Canada' ||
            'canada'
        ) {
            fetch(`https://api.covid19tracker.ca/summary`)
                .then((response) => response.json())
                .then((data) => {
                    let confirmed =
                        data.data[0].total_cases.toLocaleString();
                    let recovered =
                        data.data[0].total_recoveries.toLocaleString();
                    let deaths =
                        data.data[0].total_fatalities.toLocaleString();
                    let vaccinations =
                        data.data[0].total_vaccinations.toLocaleString();
                    let vaccinated = data.data[0].total_vaccinated;

                    fetch(
                        `https://api.covid19tracker.ca/summary/split`,
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            let confirmedON =
                                data.data[0].total_cases.toLocaleString();
                            let recoveredON =
                                data.data[0].total_recoveries.toLocaleString();
                            let deathsON =
                                data.data[0].total_fatalities.toLocaleString();
                            let vaccinationsON =
                                data.data[0].total_vaccinations.toLocaleString();
                            let vaccinatedON =
                                data.data[0].total_vaccinated.toLocaleString();

                            let confirmedQC =
                                data.data[1].total_cases.toLocaleString();
                            let recoveredQC =
                                data.data[1].total_recoveries.toLocaleString();
                            let deathsQC =
                                data.data[1].total_fatalities.toLocaleString();
                            let vaccinationsQC =
                                data.data[1].total_vaccinations.toLocaleString();
                            let vaccinatedQC =
                                data.data[1].total_vaccinated.toLocaleString();

                            let confirmedNS =
                                data.data[2].total_cases.toLocaleString();
                            let recoveredNS =
                                data.data[2].total_recoveries.toLocaleString();
                            let deathsNS =
                                data.data[2].total_fatalities.toLocaleString();
                            let vaccinationsNS =
                                data.data[2].total_vaccinations.toLocaleString();
                            let vaccinatedNS =
                                data.data[2].total_vaccinated.toLocaleString();

                            let confirmedNB =
                                data.data[3].total_cases.toLocaleString();
                            let recoveredNB =
                                data.data[3].total_recoveries.toLocaleString();
                            let deathsNB =
                                data.data[3].total_fatalities.toLocaleString();
                            let vaccinationsNB =
                                data.data[3].total_vaccinations.toLocaleString();
                            let vaccinatedNB =
                                data.data[3].total_vaccinated.toLocaleString();

                            let confirmedMB =
                                data.data[4].total_cases.toLocaleString();
                            let recoveredMB =
                                data.data[4].total_recoveries.toLocaleString();
                            let deathsMB =
                                data.data[4].total_fatalities.toLocaleString();
                            let vaccinationsMB =
                                data.data[4].total_vaccinations.toLocaleString();
                            let vaccinatedMB =
                                data.data[4].total_vaccinated.toLocaleString();

                            let confirmedBC =
                                data.data[5].total_cases.toLocaleString();
                            let recoveredBC =
                                data.data[5].total_recoveries.toLocaleString();
                            let deathsBC =
                                data.data[5].total_fatalities.toLocaleString();
                            let vaccinationsBC =
                                data.data[5].total_vaccinations.toLocaleString();
                            let vaccinatedBC =
                                data.data[5].total_vaccinated.toLocaleString();

                            let confirmedPE =
                                data.data[6].total_cases.toLocaleString();
                            let recoveredPE =
                                data.data[6].total_recoveries.toLocaleString();
                            let deathsPE =
                                data.data[6].total_fatalities.toLocaleString();
                            let vaccinationsPE =
                                data.data[6].total_vaccinations.toLocaleString();
                            let vaccinatedPE =
                                data.data[6].total_vaccinated.toLocaleString();

                            let confirmedSK =
                                data.data[7].total_cases.toLocaleString();
                            let recoveredSK =
                                data.data[7].total_recoveries.toLocaleString();
                            let deathsSK =
                                data.data[7].total_fatalities.toLocaleString();
                            let vaccinationsSK =
                                data.data[7].total_vaccinations.toLocaleString();
                            let vaccinatedSK =
                                data.data[7].total_vaccinated.toLocaleString();

                            let confirmedAB =
                                data.data[8].total_cases.toLocaleString();
                            let recoveredAB =
                                data.data[8].total_recoveries.toLocaleString();
                            let deathsAB =
                                data.data[8].total_fatalities.toLocaleString();
                            let vaccinationsAB =
                                data.data[8].total_vaccinations.toLocaleString();
                            let vaccinatedAB =
                                data.data[8].total_vaccinated.toLocaleString();

                            let confirmedNL =
                                data.data[9].total_cases.toLocaleString();
                            let recoveredNL =
                                data.data[9].total_recoveries.toLocaleString();
                            let deathsNL =
                                data.data[9].total_fatalities.toLocaleString();
                            let vaccinationsNL =
                                data.data[9].total_vaccinations.toLocaleString();
                            let vaccinatedNL =
                                data.data[9].total_vaccinated.toLocaleString();

                            let confirmedNT =
                                data.data[10].total_cases.toLocaleString();
                            let recoveredNT =
                                data.data[10].total_recoveries.toLocaleString();
                            let deathsNT =
                                data.data[10].total_fatalities.toLocaleString();
                            let vaccinationsNT =
                                data.data[10].total_vaccinations.toLocaleString();
                            let vaccinatedNT =
                                data.data[10].total_vaccinated.toLocaleString();

                            let confirmedYT =
                                data.data[11].total_cases.toLocaleString();
                            let recoveredYT =
                                data.data[11].total_recoveries.toLocaleString();
                            let deathsYT =
                                data.data[11].total_fatalities.toLocaleString();
                            let vaccinationsYT =
                                data.data[11].total_vaccinations.toLocaleString();
                            let vaccinatedYT =
                                data.data[11].total_vaccinated.toLocaleString();

                            let confirmedNU =
                                data.data[12].total_cases.toLocaleString();
                            let recoveredNU =
                                data.data[12].total_recoveries.toLocaleString();
                            let deathsNU =
                                data.data[12].total_fatalities.toLocaleString();
                            let vaccinationsNU =
                                data.data[12].total_vaccinations.toLocaleString();
                            let vaccinatedNU =
                                data.data[12].total_vaccinated.toLocaleString();

                            const Canada = new MessageEmbed()
                                .setColor('#92b094')
                                .setDescription('Stay Safe 😷')
                                .setThumbnail(
                                    'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                )
                                .setTitle(
                                    `COVID-19 Stats for **Canada** 🌐`,
                                )
                                .addField(
                                    'Confirmed Cases',
                                    confirmed,
                                    '🦠',
                                )
                                .addField(
                                    'Recovered',
                                    recovered,
                                    '🏥',
                                )
                                .addField('Deaths', deaths)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinations}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinated}`,
                                    inline: true,
                                },
                            );

                            const Ontario = new MessageEmbed()
                                .setColor('#92b094')
                                .setDescription('Stay Safe 😷')
                                .setThumbnail(
                                    'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                )
                                .setTitle(
                                    `COVID-19 Stats for **Ontario** 🌐`,
                                )
                                .addField(
                                    'Confirmed Cases',
                                    confirmedON,
                                    '🦠',
                                )
                                .addField(
                                    'Recovered',
                                    recoveredON,
                                    '🏥',
                                )
                                .addField('Deaths', deathsON)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsON}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedON}`,
                                    inline: true,
                                },
                            );

                            const Quebec = new MessageEmbed()
                                .setColor('#92b094')
                                .setDescription('Stay Safe 😷')
                                .setThumbnail(
                                    'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                )
                                .setTitle(
                                    `COVID-19 Stats for **Quebec** 🌐`,
                                )
                                .addField(
                                    'Confirmed Cases',
                                    confirmedQC,
                                    '🦠',
                                )
                                .addField(
                                    'Recovered',
                                    recoveredQC,
                                    '🏥',
                                )
                                .addField('Deaths', deathsQC)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsQC}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedQC}`,
                                    inline: true,
                                },
                            );

                            const NovaScotia =
                                new MessageEmbed()
                                    .setColor('#92b094')
                                    .setDescription('Stay Safe 😷')
                                    .setThumbnail(
                                        'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                    )
                                    .setTitle(
                                        `COVID-19 Stats for **Nova Scotia** 🌐`,
                                    )
                                    .addField(
                                        'Confirmed Cases',
                                        confirmedNS,
                                        '🦠',
                                    )
                                    .addField(
                                        'Recovered',
                                        recoveredNS,
                                        '🏥',
                                    )
                                    .addField('Deaths', deathsNS)
                                    .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsNS}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedNS}`,
                                    inline: true,
                                },
                            );

                            const NewBrunswick =
                                new MessageEmbed()
                                    .setColor('#92b094')
                                    .setDescription('Stay Safe 😷')
                                    .setThumbnail(
                                        'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                    )
                                    .setTitle(
                                        `COVID-19 Stats for **New Brunswick** 🌐`,
                                    )
                                    .addField(
                                        'Confirmed Cases',
                                        confirmedNB,
                                        '🦠',
                                    )
                                    .addField(
                                        'Recovered',
                                        recoveredNB,
                                        '🏥',
                                    )
                                    .addField('Deaths', deathsNB)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsNB}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedNB}`,
                                    inline: true,
                                },
                            )

                            const Manitoba =
                                new MessageEmbed()
                                    .setColor('#92b094')
                                    .setDescription('Stay Safe 😷')
                                    .setThumbnail(
                                        'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                    )
                                    .setTitle(
                                        `COVID-19 Stats for **Manitoba** 🌐`,
                                    )
                                    .addField(
                                        'Confirmed Cases',
                                        confirmedMB,
                                        '🦠',
                                    )
                                    .addField(
                                        'Recovered',
                                        recoveredMB,
                                        '🏥',
                                    )
                                    .addField('Deaths', deathsMB)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsMB}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedMB}`,
                                    inline: true,
                                },
                            );

                            const BritishColumbia =
                                new MessageEmbed()
                                    .setColor('#92b094')
                                    .setDescription('Stay Safe 😷')
                                    .setThumbnail(
                                        'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                    )
                                    .setTitle(
                                        `COVID-19 Stats for **British Columbia** 🌐`,
                                    )
                                    .addField(
                                        'Confirmed Cases',
                                        confirmedBC,
                                        '🦠',
                                    )
                                    .addField(
                                        'Recovered',
                                        recoveredBC,
                                        '🏥',
                                    )
                                    .addField('Deaths', deathsBC)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsBC}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedBC}`,
                                    inline: true,
                                },
                            );

                            const PrinceEdwardIsland =
                                new MessageEmbed()
                                    .setColor('#92b094')
                                    .setDescription('Stay Safe 😷')
                                    .setThumbnail(
                                        'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                    )
                                    .setTitle(
                                        `COVID-19 Stats for **Prince Edward Island** 🌐`,
                                    )
                                    .addField(
                                        'Confirmed Cases',
                                        confirmedPE,
                                        '🦠',
                                    )
                                    .addField(
                                        'Recovered',
                                        recoveredPE,
                                        '🏥',
                                    )
                                    .addField('Deaths', deathsPE)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsPE}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedPE}`,
                                    inline: true,
                                },
                            );

                            const Saskatchewan =
                                new MessageEmbed()
                                    .setColor('#92b094')
                                    .setDescription('Stay Safe 😷')
                                    .setThumbnail(
                                        'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                    )
                                    .setTitle(
                                        `COVID-19 Stats for **Saskatchewan** 🌐`,
                                    )
                                    .addField(
                                        'Confirmed Cases',
                                        confirmedSK,
                                        '🦠',
                                    )
                                    .addField(
                                        'Recovered',
                                        recoveredSK,
                                        '🏥',
                                    )
                                    .addField('Deaths', deathsSK)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsSK}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedSK}`,
                                    inline: true,
                                },
                            );

                            const Alberta = new MessageEmbed()
                                .setColor('#92b094')
                                .setDescription('Stay Safe 😷')
                                .setThumbnail(
                                    'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                )
                                .setTitle(
                                    `COVID-19 Stats for **Alberta** 🌐`,
                                )
                                .addField(
                                    'Confirmed Cases',
                                    confirmedAB,
                                    '🦠',
                                )
                                .addField(
                                    'Recovered',
                                    recoveredAB,
                                    '🏥',
                                )
                                .addField('Deaths', deathsAB)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsAB}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedAB}`,
                                    inline: true,
                                },
                            );

                            const NewfoundlandAndLabrador =
                                new MessageEmbed()
                                    .setColor('#92b094')
                                    .setDescription('Stay Safe 😷')
                                    .setThumbnail(
                                        'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                    )
                                    .setTitle(
                                        `COVID-19 Stats for **Newfoundland And Labrador** 🌐`,
                                    )
                                    .addField(
                                        'Confirmed Cases',
                                        confirmedNL,
                                        '🦠',
                                    )
                                    .addField(
                                        'Recovered',
                                        recoveredNL,
                                        '🏥',
                                    )
                                    .addField('Deaths', deathsNL)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsNL}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedNL}`,
                                    inline: true,
                                },
                            );

                            const NorthwestTerritories =
                                new MessageEmbed()
                                    .setColor('#92b094')
                                    .setDescription('Stay Safe 😷')
                                    .setThumbnail(
                                        'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                    )
                                    .setTitle(
                                        `COVID-19 Stats for **Northwest Territories** 🌐`,
                                    )
                                    .addField(
                                        'Confirmed Cases',
                                        confirmedNT,
                                        '🦠',
                                    )
                                    .addField(
                                        'Recovered',
                                        recoveredNT,
                                        '🏥',
                                    )
                                    .addField('Deaths', deathsNT)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsNT}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedNT}`,
                                    inline: true,
                                },
                            );

                            const Yukon = new MessageEmbed()
                                .setColor('#92b094')
                                .setDescription('Stay Safe 😷')
                                .setThumbnail(
                                    'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                )
                                .setTitle(
                                    `COVID-19 Stats for **Yukon** 🌐`,
                                )
                                .addField(
                                    'Confirmed Cases',
                                    confirmedYT,
                                    '🦠',
                                )
                                .addField(
                                    'Recovered',
                                    recoveredYT,
                                    '🏥',
                                )
                                .addField('Deaths', deathsYT)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsYT}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedYT}`,
                                    inline: true,
                                },
                            );

                            const Nunavut = new MessageEmbed()
                                .setColor('#92b094')
                                .setDescription('Stay Safe 😷')
                                .setThumbnail(
                                    'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                )
                                .setTitle(
                                    `COVID-19 Stats for **Nunavut** 🌐`,
                                )
                                .addField(
                                    'Confirmed Cases',
                                    confirmedNU,
                                    '🦠',
                                )
                                .addField(
                                    'Recovered',
                                    recoveredNU,
                                    '🏥',
                                )
                                .addField('Deaths', deathsNU)
                            .addFields(
                                {
                                    name: `Vaccine Doses Administered`,
                                    value: `${vaccinationsNU}`,
                                    inline: true,
                                },
                                {
                                    name: `People Vaccinated`,
                                    value: `${vaccinatedNU}`,
                                    inline: true,
                                },
                            );

                            const embeds = [
                                Canada,
                                Ontario,
                                Quebec,
                                NovaScotia,
                                NewBrunswick,
                                Manitoba,
                                BritishColumbia,
                                PrinceEdwardIsland,
                                Saskatchewan,
                                Alberta,
                                NewfoundlandAndLabrador,
                                NorthwestTerritories,
                                Yukon,
                                Nunavut,
                            ];
                            pagination({
                                embeds: embeds,
                                channel: interaction.channel,
                                author: interaction.user,
                                time: 10000,
                                fastSkip: true,
                                pageTravel: true,
                            });
                        });
                })
                .catch((e) => {
                    return interaction.followUp({content:`that ain't a country, try again`})
                });
        } 
            else {
            fetch(
                `https://covid19.mathdro.id/api/countries/${countries}`,
            )
                .then((response) => response.json())
                .then((data) => {
                    let confirmed =
                        data.confirmed.value.toLocaleString();
                    let recovered =
                        data.recovered.value.toLocaleString();
                    let deaths = data.deaths.value.toLocaleString();
                    let confirmedForConversion = data.confirmed.value;
                    let recoveredForConversion = data.recovered.value;
                    let deathsForConversion = data.deaths.value;
                    let active = (
                        confirmedForConversion -
                        recoveredForConversion -
                        deathsForConversion
                    ).toLocaleString();
                    let newFetched =
                        data.confirmed.detail.toLocaleString();
                    fetch(newFetched)
                        .then((response) => response.json())
                        .then((data) => {
                            let Country =
                                data[0].countryRegion.toLocaleString();

                            const embed = new MessageEmbed()
                                .setColor('#92b094')
                                .setThumbnail(
                                    'https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png',
                                )
                                .setTitle(
                                    `COVID-19 Stats for **${Country}** 🌐`,
                                )
                                .addField(
                                    'Confirmed Cases',
                                    confirmed,
                                    '🦠',
                                )
                                .addField(
                                    'Recovered',
                                    recovered,
                                    '🏥',
                                )
                                .addField('Deaths', deaths)
                                .addField('Active Cases', active)
                                .setDescription('Stay Safe 😷');

                            interaction.followUp({embeds:[embed]});
                        });
                })
                .catch((e) => {
                    return interaction.followUp({content:`that ain't a country, try again`})
                });
        }
    }, 
};