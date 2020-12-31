const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: "reddit",
    description: "recieve a random image from a subreddit of your choice",

    async execute(client, message, args, Discord) { 
        const subReddits = ["dankmemes", "meme", "memes", "wholesomememes", "funny", ]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
        const subred = args.join(" ");

        if (args.join(" ")){
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
            
        }else{
            const randomembed = new Discord.MessageEmbed()
            got(`https://www.reddit.com/r/${random}/random/.json`).then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            randomembed.setTitle(`${memeTitle}`)
            randomembed.setDescription(`media from r/${random}`)
            randomembed.setURL(`${memeUrl}`)
            randomembed.setImage(memeImage)
            randomembed.setColor('RANDOM')
            randomembed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(randomembed);
        })
        }


    }
}