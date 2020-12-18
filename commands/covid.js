  
const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",

    async execute(client, message, args){

        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xFF0000)
        .setDescription('you\'re missing things ~~most likely your brain~~ try `.covid all` or `.covid Canada`')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .addField('Confirmed Cases', confirmed, '🦠')
                .addField('Recovered', recovered,  '🏥')
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