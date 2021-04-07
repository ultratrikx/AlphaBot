const ezlocalTime = require('ez-local-time');
const Discord = require('discord.js');

module.exports = {
    name: 'slomo',
    description: 'this command does math',

    async execute(client, message, args, Discord) {
        const dateobject = ezlocalTime('America/Toronto');
        const general = client.channels.cache.get(
            '796140427878858763',
        );
        const botCmnds = client.channels.cache.get(
            '796130718392516628',
        );
        const polls = client.channels.cache.get('796140529200398357');
        const mediaZone = client.channels.cache.get(
            '796139852470157394',
        );
        const art = client.channels.cache.get('798233637920964618');
        const weeb = client.channels.cache.get('798250341720129547');
        const games = client.channels.cache.get('798281598172135444');
        const gameContest = client.channels.cache.get(
            '798607709434937355',
        );
        const ipp = client.channels.cache.get('798234963530481705');
        const virtual = client.channels.cache.get(
            '798235076776296468',
        );
        // if (
        //     dateobject.day == 'Monday' ||
        //     'Tuesday' ||
        //     'Wednesday' ||
        //     'Thursday' ||
        //     ('Friday' && dateobject.time == ' 8:45:00 AM') ||
        //     ' 11:05:00 AM' ||
        //     (' 1:25:00 PM' && dateobject.month !== 'July') ||
        //     'August'
        // ) {
        //     general.setRateLimitPerUser(180);
        //     botCmnds.setRateLimitPerUser(180);
        //     polls.setRateLimitPerUser(180);
        //     mediaZone.setRateLimitPerUser(180);
        //     art.setRateLimitPerUser(180);
        //     weeb.setRateLimitPerUser(180);
        //     games.setRateLimitPerUser(180);
        //     gameContest.setRateLimitPerUser(180);
        //     ipp.setRateLimitPerUser(180);
        //     virtual.setRateLimitPerUser(180);
        // }
        // if (
        //     dateobject.day == 'Monday' ||
        //     'Tuesday' ||
        //     'Wednesday' ||
        //     'Thursday' ||
        //     ('Friday' && dateobject.time == ' 10:25:00 AM') ||
        //     ' 12:45:00 PM' ||
        //     (' 3:05:00 PM' && dateobject.month !== 'July') ||
        //     'August'
        // ) {
        //     general.setRateLimitPerUser(0);
        //     botCmnds.setRateLimitPerUser(0);
        //     polls.setRateLimitPerUser(0);
        //     mediaZone.setRateLimitPerUser(0);
        //     art.setRateLimitPerUser(0);
        //     weeb.setRateLimitPerUser(0);
        //     games.setRateLimitPerUser(0);
        //     gameContest.setRateLimitPerUser(0);
        //     ipp.setRateLimitPerUser(0);
        //     virtual.setRateLimitPerUser(0);
        // }
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            // if (message.member.roles.cache.has('689142040965152778', '665035759861891072')) {
            return message.reply(
                'nuh uh, this is too powerful for you to use',
            );
        } else {
            general.setRateLimitPerUser(180);
            botCmnds.setRateLimitPerUser(180);
            polls.setRateLimitPerUser(180);
            mediaZone.setRateLimitPerUser(180);
            art.setRateLimitPerUser(180);
            weeb.setRateLimitPerUser(180);
            games.setRateLimitPerUser(180);
            gameContest.setRateLimitPerUser(180);
            ipp.setRateLimitPerUser(180);
            virtual.setRateLimitPerUser(180);
        }
    },
};
