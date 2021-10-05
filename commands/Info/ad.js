const { Message, Client } = require("discord.js");

module.exports = {
    name: "ad",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const channelToSend = client.channels.cache.get('796140427878858763') 
        channelToSend.send(`Vote for Raghav Singh as Prime Minister!!\n For more info use the command /raghav_for_pm \nhttps://cdn.discordapp.com/attachments/856543669938946048/895058206617911306/unnamed.gif`);
    },
};

