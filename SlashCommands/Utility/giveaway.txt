const { SlashCommandBuilder } = require('@discordjs/builders')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('ENTER DESCRIPTION HERE')
        .addChannelOption(option => 
            option
            .setName('channel')
            .setDescription('the channel you want the giveaway in')
            .setRequired(true)
            )
        .addStringOption(option => 
            option
            .setName('duration')
            .setDescription('the duration of the giveaway')
            .setRequired(true)
            )
        .addIntegerOption(option => 
            option
            .setName('number_of_winners')
            .setDescription('the number of winners for the giveaway')
            .setRequired(true)
            )
        .addStringOption(option => 
            option
            .setName('prize')
            .setDescription('the prize of the giveaway')
            .setRequired(true)
            ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        let giveawayChannel = interaction.options.getChannel('channel')
        let giveawayDuration = interaction.options.getString('duration')
        let giveawayNumberWinners = interaction.options.getInteger('number_of_winners')
        let giveawayPrize = interaction.options.getString('prize')

            client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            time: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: giveawayNumberWinners,
            // Who hosts this giveaway
            hostedBy: interaction.author,
            //client.config.host ?
            // Messages
            messages: {
                giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
                giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
                timeRemaining: 'Time remaining: **{duration}**!',
                inviteToParticipate: 'React with 🎉 to participate!',
                winMessage:
                    'Congratulations, {winners}! You won **{prize}**!',
                embedFooter: 'Giveaways',
                noWinner:
                    'Giveaway cancelled, no valid participations.',
                hostedBy: 'Hosted by: {user}',
                winners: 'winner(s)',
                endedAt: 'Ended at',
                units: {
                    seconds: 'seconds',
                    minutes: 'minutes',
                    hours: 'hours',
                    days: 'days',
                    pluralS: false, // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                },
            },
        });

        interaction.followUp({content: `Giveaway started in ${giveawayChannel}`});
    },
};