const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    ...new SlashCommandBuilder()
        .setName('clear')
        .setDescription('deletes specified amount of messages')
        .addIntegerOption(option => 
            option
            .setName('amount')
            .setDescription('the amount of messages to clear')
            .setRequired(true)
            ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const amount = interaction.options.getInteger('amount')
        
            

        if (amount > 100) {
            interaction.followUp(
                { content: 'the maximum amount of messages you can delete is 100',
            })
        }else if (amount < 1){
            interaction.followUp({ content: 'the minimum amount of messages you can delete is 1'});
        } else
            interaction.channel.messages
                .fetch({ limit: amount })
                .then((messages) => {
                    interaction.channel.bulkDelete(messages);
                });
        
    },
};