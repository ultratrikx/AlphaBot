const fetch = require('node-fetch');

module.exports = {
    name: 'idk',
    description:
        'tracks COVID-19 of a specific country or the entire world',

    async execute(client, message, args, Discord) {
        const noArgs = new Discord.MessageEmbed()
            .setTitle('Missing arguments')
            .setColor(0xff0000)
            .setDescription(
                "you're missing arguements try `.covid all` or `.covid Canada`",
            )
            .setTimestamp();

        if (!args[0]) return message.channel.send(noArgs);

        if (args[0] === 'whatever') {
            fetch(`https://api.covid19tracker.ca/summary/split`)
                .then((response) => response.json())
                .then((data) => {
                    let array = data;
                    for (let i = 0; i < array.length; i++) {
                        let oragne =
                            data.data[i].total_cases.toLocaleString();
                        let province =
                            data.data[i].province.toLocaleString();
                        if (province === args[0]) {
                            console.log(oragne);
                        }
                    }
                });
        } else {
            fetch(`https://api.covid19tracker.ca/summary/split`)
                .then((response) => response.json())
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        let oragne =
                            data.data[i].total_cases.toLocaleString();
                        let province =
                            data.data[i].province.toLocaleString();
                        if (province === args[0]) {
                            console.log(oragne);
                        }
                    }
                });
        }
    },
};
