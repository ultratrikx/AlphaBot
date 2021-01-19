const Discord = require('discord.js');
const ms = require('ms');
const db = require('quick.db');

module.exports = {
    name: 'timer',
    description: 'a timer, whoa',
    async execute(client, message, args, Discord) {
        let timeuser = args[0];

        if (!timeuser)
            return message.reply(
                ':x: enter time in the following format 10m 10s 10d',
            );

        db.set(
            `remind.${message.author.id}`,
            Date.now() + ms(timeuser),
        );
        message.channel.send('okay');
        const interval = setInterval(function () {
            if (
                Date.now() > db.fetch(`remind.${message.author.id}`)
            ) {
                db.delete(`remind.${message.author.ßid}`);
                message.channel
                    .send(`Times Up`)
                    .catch((e) => console.log(e));
                clearInterval(interval);
            }
        }, 1000);
    },
};
