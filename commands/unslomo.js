module.exports = {
    name: 'unslomo',
    aliases: ['us'],
    description: 'ends any existing slowmode in all channels',

    async execute(client, message, args, Discord) {
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
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply(
                'nuh uh, this is too powerful for you to use',
            );
        } else {
            general.setRateLimitPerUser(0);
            botCmnds.setRateLimitPerUser(0);
            polls.setRateLimitPerUser(0);
            mediaZone.setRateLimitPerUser(0);
            art.setRateLimitPerUser(0);
            weeb.setRateLimitPerUser(0);
            games.setRateLimitPerUser(0);
            gameContest.setRateLimitPerUser(0);
            ipp.setRateLimitPerUser(0);
            virtual.setRateLimitPerUser(0);
        }
    },
};
