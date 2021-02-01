const nba = require('nba.js').default;

module.exports = {
    name: 'anba',
    description: 'gives you a green role',
    execute(client, message, args, Discord) {
        nba.data
            .conferenceStandings()
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                console.error(err);
            });
    },
};
