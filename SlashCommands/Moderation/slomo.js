const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "slomo",
    description: "slows down all channels",
    userPermissions: ['MANAGE_MESSAGES'],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
                if (!interaction.member.hasPermission('MANAGE_MESSAGES')) {
            return interaction.followUp({ content: 'You do not have permission'})
        } else {
            const general = client.channels.cache.get(
                '796140427878858763',
            );
            const botCmnds = client.channels.cache.get(
                '796130718392516628',
            );
            const polls = client.channels.cache.get(
                '796140529200398357',
            );
            const mediaZone = client.channels.cache.get(
                '796139852470157394',
            );
            const art = client.channels.cache.get(
                '798233637920964618',
            );
            const weeb = client.channels.cache.get(
                '798250341720129547',
            );
            const games = client.channels.cache.get(
                '798281598172135444',
            );
            const gameContest = client.channels.cache.get(
                '798607709434937355',
            );
            const ipp = client.channels.cache.get(
                '798234963530481705',
            );
            const virtual = client.channels.cache.get(
                '798235076776296468',
            );
            function sleep(ms) {
                return new Promise((resolve) =>
                    setTimeout(resolve, ms),
                );
            }
            async function slomoSet() {
                general.setRateLimitPerUser(90);
                botCmnds.setRateLimitPerUser(90);
                polls.setRateLimitPerUser(90);
                mediaZone.setRateLimitPerUser(90);
                art.setRateLimitPerUser(90);
                weeb.setRateLimitPerUser(90);
                games.setRateLimitPerUser(90);
                gameContest.setRateLimitPerUser(90);
                ipp.setRateLimitPerUser(90);
                virtual.setRateLimitPerUser(90);
                await sleep(6000000);
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
                await sleep(2400000);
                general.setRateLimitPerUser(90);
                botCmnds.setRateLimitPerUser(90);
                polls.setRateLimitPerUser(90);
                mediaZone.setRateLimitPerUser(90);
                art.setRateLimitPerUser(90);
                weeb.setRateLimitPerUser(90);
                games.setRateLimitPerUser(90);
                gameContest.setRateLimitPerUser(90);
                ipp.setRateLimitPerUser(90);
                virtual.setRateLimitPerUser(90);
                await sleep(6000000);
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
                await sleep(2400000);
                general.setRateLimitPerUser(90);
                botCmnds.setRateLimitPerUser(90);
                polls.setRateLimitPerUser(90);
                mediaZone.setRateLimitPerUser(90);
                art.setRateLimitPerUser(90);
                weeb.setRateLimitPerUser(90);
                games.setRateLimitPerUser(90);
                gameContest.setRateLimitPerUser(90);
                ipp.setRateLimitPerUser(90);
                virtual.setRateLimitPerUser(90);
                await sleep(6000000);
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

            slomoSet();
        }
    },
};