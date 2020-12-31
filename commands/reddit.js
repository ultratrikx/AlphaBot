const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: "rer",
    description: "recieve a random image from a subreddit of your choice",

    async execute(client, message, args, Discord) { 
        const subReddits = ["dankmemes", "meme", "memes", "wholesomememes", "funny", ]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
        const subred = args.join(" ");

        if (subred == null) return subred = `${random}`;

        const embed = new Discord.MessageEmbed()
        got(`https://www.reddit.com/r/${subred}/random/.json`).then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setDescription(`media from r/${subred}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(embed);
        })

    }
}