const Discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")

module.exports ={
    name: 'newyear',
    description: "reminder",
    async execute(client,message,args){
        const channels = client.channels.cache.get('657402007925030925')
        let timeuser = args[0]
        let reason = args.slice(1).join(" ")
        
        if(!timeuser) return message.reply(":x: enter time in the following format 10m 10s 10d")
        if(!reason) return message.reply(":x: enter reason")
        
        db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))
        message.channel.send("ok")
        const interval = setInterval(function() {
        
        
            if(Date.now() > db.fetch(`remind.${message.author.id}`)){
                db.delete(`remind.${message.author.id}`)
                //message.channel.send(`**Remind:**${reason}`)
                channels.send('🎉🎊 **Happy New Year!!** 🎊🎉')
                .catch(e => console.log(e))
                clearInterval(interval)
            }
        
        },1000)
        }
}
        exports.conf = {
            enabled: true,
            guildOnly: true,
            aliase:["r"]
        }
        
        exports.help = {
            name:"remind",
            description:"Empty",
            usage:"remind",
            category:"general"
        }