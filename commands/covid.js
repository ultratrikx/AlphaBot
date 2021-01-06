
const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "tracks COVID-19 of a specific country or the entire world",

    async execute(client, message, args) {

        let countries = args.join(" ");

        const noArgs = new Discord.MessageEmbed()
            .setTitle('Missing arguments')
            .setColor(0xFF0000)
            .setDescription('you\'re missing arguements try `.covid all` or `.covid Canada`')
            .setTimestamp()

        if (!args[0]) return message.channel.send(noArgs);

        if (args[0] === "all") {
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setColor('#92b094')
                        .setThumbnail('https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png')
                        .setTitle(`Worldwide COVID-19 Stats 🌎`)
                        .addField('Confirmed Cases', confirmed, '🦠')
                        .addField('Recovered', recovered, '🏥')
                        .addField('Deaths', deaths)
                        .setDescription('Stay Safe 😷')

                    message.channel.send(embed)
                })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setColor('#92b094')
                        .setThumbnail('https://cdn.discordapp.com/attachments/764586697437741088/792495914819780628/Screen_Shot_2020-12-26_at_3.55.05_PM.png')
                        .setTitle(`COVID-19 Stats for **${countries}** 🌐`)
                        .addField('Confirmed Cases', confirmed, '🦠')
                        .addField('Recovered', recovered, '🏥')
                        .addField('Deaths', deaths)
                        .setDescription('Stay Safe 😷')

                    message.channel.send(embed)
                }).catch(e => {
                    return message.channel.send('that ain\'t a country, try again')
                })
        }
    }
}