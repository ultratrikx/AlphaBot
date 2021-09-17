const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    ...new SlashCommandBuilder()
        .setName('math')
        .setDescription('solves math equations')
        .addStringOption(option => 
            option
                .setName('equation')
                .setDescription('the equation you want to solve')
                .setRequired(true)
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const equation = interaction.options.getString('equation');

        let resp;

        try {
            resp = math.evaluate(equation.join(' '));
        } catch (e) {
            return interaction.followUp({ content: `a **valid** equation please`})
        }

        const embed = new MessageEmbed()
            .setColor(0x808080)
            .setTitle('Big Brain')
            .addField('Qustion', `\`\`\`css\n${equation.join(' ')}\`\`\``)
            .addField('Answer', `\`\`\`css\n${resp}\`\`\``);

        interaction.followUp({ embeds: [embed]});
    },
};