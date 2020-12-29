const pagination = require ('discord.js-pagination')
const Discord = require ('discord.js')

module.exports = {
    name: 'help',
    description: "the all in one help command for help",
    async execute(client, message, args, Discord){
        const mainpage = new Discord.MessageEmbed()
        .setColor('#db0000')
        .setTitle('Commands Help')
        .setThumbnail('https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setAuthor('Alpha Bot Commands Help', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription("Simply scroll through pages using the reaction emoji's below")
        .setTimestamp()

        const moderation = new Discord.MessageEmbed()
        .setColor('#ed3746')
        .setTitle('Moderation Commands Help')
        .setAuthor('Alpha Bot Commands Help', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription("For admins only")
        .addField('`.clear [number]`','clear set number of messages')
        .addField('`.mute [@user] [number]m or s`','timed mute mentioned user')
        .addField('`.unmute [@user]`','manually unmute the mentioned user')
        .addField('`.kick [@user]`','kick mentioned user')
        .addField('`.ban [@user]`','punish someone who says trans right aren‘t human rights')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setColor('#6b81ff')
        .setTitle('Utility Commands Help')
        .setAuthor('Alpha Bot Commands Help', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription("Just some random stuff")
        .addField('`.weather [location]`','for weather of said location')
        .addField('`.covid [country, all]`','info about their covid cases')
        .addField('`.math [math equation]`','math calculation')
        .addField('`.botinfo`','information about the bot')
        .addField('`.ping`','to get lag info')
        .addField('`.giveaway #channel [duration] [number of winners] [prize]`','host a giveaway')
        .addField('`.reroll [message ID of giveaway]`',' reroll the winners of a giveaway')
        .addField('`.endgiveaway [message ID of giveaway]`','end a giveaway early')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setColor('#e5ff00')
        .setTitle('Fun Commands Help')
        .setAuthor('Alpha Bot Commands Help', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription("Fun Commands stuff")
        .addField('`.babykata2`','funny command')
        .addField('`.hi`','more funny command')
        .addField('`.meme`','get a random meme')
        .addField('`.bigword`','makes your text big')
        .setTimestamp()

        const economy = new Discord.MessageEmbed()
        .setColor('#e5ff00')
        .setTitle('Economy Commands Help')
        .setAuthor('Alpha Bot Commands Help', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription("Economy Commands stuff")
        .addField('`.bal`','check balance')
        .addField('`.daily`','collect daily money')
        .addField('`.work`','work and earn money')
       // .addField('`.shop`','open shop')
       // .addField('`.buy`','buy something from shop')
       // .addField('`.inv`','check inventory')
       // .addField('`.lb`','check server leaderboard')
        .setTimestamp()

        const colourroles = new Discord.MessageEmbed()
        .setColor('#00ffd5')
        .setTitle('Colourful Roles Command Help')
        .setAuthor('Alpha Bot Commands Help', 'https://cdn.discordapp.com/avatars/702514788340858892/d72991959325a20107bb0efb61118361.png?size=1024')
        .setDescription("Get some colourful roles")
        .addField('`.redrole`','red coloured role!')
        .addField('`.blues`','blue coloured role!')
        .addField('`.grebn`','easiest way to become shrek')
        .addField('`.pruple`','the typo was intentional')
        .addField('`.ramenings colour`','cause confuse')
        .addField('`.adminblack`','only for admins, the darkest black')
        .addField('`.boostercolour`','bright pink only for our serotonin boosters')
        .setTimestamp()

        const pages = [
                mainpage,
                colourroles,
                utility,
                economy,
                fun,
                moderation
        ]
        const emojilist = ["⏪", "⏩"]
        const timeout = '120000'

        pagination(message, pages, emojilist, timeout)

    }
}