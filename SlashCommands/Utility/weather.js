const { SlashCommandBuilder } = require('@discordjs/builders')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const weather = require('weather-js');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('weather')
        .setDescription('gives you the weather')
        .addStringOption(option => 
            option
                .setName('location')
                .setDescription('the location you want the weather for')
                .setRequired(true)
            ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const location = interaction.options.getString('location')
        weather.find(
            { search: location, degreeType: 'C' },
            function (error, result) {
                // 'C' can be changed to 'F' for farneheit results
                if (error)
                    return interaction.followUp({content: 'Something went wrong'});
                if (!args[0])
                    return interaction.followUp({content: 'Please specify a location'});

                if (result === undefined || result.length === 0)
                    return interaction.followUp({content: '**Invalid** location'})

                var current = result[0].current;
                var location = result[0].location;

                const weatherinfo = new MessageEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor(
                        `Weather Forecast for ${current.observationpoint}`,
                    )
                    .setThumbnail(current.imageUrl)
                    .setColor(0x111111)
                    .addField(
                        'Timezone',
                        `UTC${location.timezone}`,
                        true,
                    )
                    .addField('Degree Type', 'Celsius', true)
                    .addField(
                        'Temperature',
                        `${current.temperature}°`,
                        true,
                    )
                    .addField('Wind', current.winddisplay, true)
                    .addField(
                        'Feels like',
                        `${current.feelslike}°`,
                        true,
                    )
                    .addField(
                        'Humidity',
                        `${current.humidity}%`,
                        true,
                    );

                interaction.followUp({embeds: [weatherinfo]});
            },
        );
    },
};