const fetch = require('node-fetch');
const Discord = require('discord.js');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6d6b96d493104097bcc65d7634d02139');
const pagination = require('discord.js-pagination');

module.exports = {
    name: 'news',
    description: 'search news articles by name',

    async execute(client, message, args, Discord) {
        let query = args.join(' ');

        const noArgs = new Discord.MessageEmbed()
            .setTitle('Missing arguments')
            .setColor(0xff0000)
            .setDescription(
                "you're missing arguements try `.news tesla`",
            )
            .setTimestamp();

        if (!args[0]) return message.channel.send(noArgs);

        if (args[0] === 'shgfjhgkhljhguiiugukj') {
            return;
        } else {
            newsapi.v2
                .everything({
                    q: `${query}`,
                    language: 'en',
                    sortBy: 'relevancy',
                })
                .then((response) => {
                    let amount = response.totalResults;
                    try {
                        if (amount == 1) {
                            let author = response.articles[0].author;
                            let title = response.articles[0].title;
                            let desc =
                                response.articles[0].description;
                            let url = response.articles[0].url;
                            let thumbnail =
                                response.articles[0].urlToImage;

                            const mainpage = new Discord.MessageEmbed()
                                .setColor('#db0000')
                                .setTitle(`Top Results for ${query}`)
                                .setThumbnail(
                                    'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024',
                                )
                                .setDescription(
                                    "Simply scroll through pages using the reaction emoji's below",
                                );
                            const articleone = new Discord.MessageEmbed()
                                .setColor('#3fcce8')
                                .setTitle(title)
                                .setDescription(desc)
                                .setAuthor(`By ${author}`)
                                .setURL(url)
                                .setImage(thumbnail);

                            const pages = [mainpage, articleone];
                            const emojilist = ['⏪', '⏩'];
                            const timeout = '120000';

                            pagination(
                                message,
                                pages,
                                emojilist,
                                timeout,
                            );
                        }
                        if (amount == 2) {
                            let author = response.articles[0].author;
                            let title = response.articles[0].title;
                            let desc =
                                response.articles[0].description;
                            let url = response.articles[0].url;
                            let thumbnail =
                                response.articles[0].urlToImage;

                            let author2 = response.articles[1].author;
                            let title2 = response.articles[1].title;
                            let desc2 =
                                response.articles[1].description;
                            let url2 = response.articles[1].url;
                            let thumbnail2 =
                                response.articles[1].urlToImage;

                            const mainpage = new Discord.MessageEmbed()
                                .setColor('#db0000')
                                .setTitle(`Top Results for ${query}`)
                                .setThumbnail(
                                    'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024',
                                )
                                .setDescription(
                                    "Simply scroll through pages using the reaction emoji's below",
                                );
                            const articleone = new Discord.MessageEmbed()
                                .setColor('#3fcce8')
                                .setTitle(title)
                                .setDescription(desc)
                                .setAuthor(`By ${author}`)
                                .setURL(url)
                                .setImage(thumbnail);
                            const articletwo = new Discord.MessageEmbed()
                                .setColor('#3fcce8')
                                .setTitle(title2)
                                .setDescription(desc2)
                                .setAuthor(author2)
                                .setURL(url2)
                                .setImage(thumbnail2);

                            const pages = [
                                mainpage,
                                articleone,
                                articletwo,
                            ];
                            const emojilist = ['⏪', '⏩'];
                            const timeout = '120000';

                            pagination(
                                message,
                                pages,
                                emojilist,
                                timeout,
                            );
                        }
                        if (amount == 3 || amount > 3) {
                            let author = response.articles[0].author;
                            let title = response.articles[0].title;
                            let desc =
                                response.articles[0].description;
                            let url = response.articles[0].url;
                            let thumbnail =
                                response.articles[0].urlToImage;

                            let author2 = response.articles[1].author;
                            let title2 = response.articles[1].title;
                            let desc2 =
                                response.articles[1].description;
                            let url2 = response.articles[1].url;
                            let thumbnail2 =
                                response.articles[1].urlToImage;

                            let author3 = response.articles[2].author;
                            let title3 = response.articles[2].title;
                            let desc3 =
                                response.articles[2].description;
                            let url3 = response.articles[2].url;
                            let thumbnail3 =
                                response.articles[2].urlToImage;

                            const mainpage = new Discord.MessageEmbed()
                                .setColor('#db0000')
                                .setTitle(`Top Results for ${query}`)
                                .setThumbnail(
                                    'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024',
                                )
                                .setDescription(
                                    "Simply scroll through pages using the reaction emoji's below",
                                );
                            const articleone = new Discord.MessageEmbed()
                                .setColor('#3fcce8')
                                .setTitle(title)
                                .setDescription(desc)
                                .setAuthor(`By ${author}`)
                                .setURL(url)
                                .setImage(thumbnail);
                            const articletwo = new Discord.MessageEmbed()
                                .setColor('#3fcce8')
                                .setTitle(title2)
                                .setDescription(desc2)
                                .setAuthor(author2)
                                .setURL(url2)
                                .setImage(thumbnail2);
                            const articlethree = new Discord.MessageEmbed()
                                .setColor('#3fcce8')
                                .setTitle(title3)
                                .setDescription(desc3)
                                .setAuthor(author3)
                                .setURL(url3)
                                .setImage(thumbnail3);

                            const pages = [
                                mainpage,
                                articleone,
                                articletwo,
                                articlethree,
                            ];
                            const emojilist = ['⏪', '⏩'];
                            const timeout = '120000';

                            pagination(
                                message,
                                pages,
                                emojilist,
                                timeout,
                            );
                        }
                        if (amount == 0 || undefined) {
                            message.channel.send(
                                `Your search - \`${query}\` - did not match any articles.\n\n` +
                                    `**Suggestions:**\n` +
                                    `Make sure that all words are spelled correctly.\n` +
                                    `Try different keywords.\n` +
                                    `Try more general keywords.\n` +
                                    `Try fewer keywords.\n`,
                            );
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
        }
    },
};
