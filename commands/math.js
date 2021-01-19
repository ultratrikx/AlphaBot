const math = require('mathjs');

const Discord = require('discord.js');
const { description, execute } = require('./help');

module.exports = {
    name: 'math',
    description: 'this command does math',

    async execute(client, message, args, Discord) {
        if (!args[0])
            return message.channel.send(
                'provide a equation you genius',
            );

        let resp;

        try {
            resp = math.evaluate(args.join(' '));
        } catch (e) {
            return message.channel.send(
                'a **valid** equation please',
            );
        }

        const embed = new Discord.MessageEmbed()
            .setColor(0x808080)
            .setTitle('Big Brain')
            .addField('Qustion', `\`\`\`css\n${args.join(' ')}\`\`\``)
            .addField('Answer', `\`\`\`css\n${resp}\`\`\``);

        message.channel.send(embed);
    },
};
