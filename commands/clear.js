module.exports = {
    name: 'clear',
    description: "this is a clear command!",
    async execute(message, args){

        if(message.member.roles.cache.has('764586697106522147', '689142040965152778', '665035759861891072')){
            if(!args[0]) return message.reply("enter a number of messages to clear");
            if(isNaN(args[0])) return message.reply("enter a number following the command like so `.clear [1]`");

            if(args[0] > 100) return message.reply("the maximum amount of messages you can delete is 100");
            if(args[0] < 1) return message.reply("delete at least 1 message");
        
        
            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages);
                message.reply('Done').then((m) => m.delete({ timeout: 500 }));
        } 

        )
        } else{
            message.reply("nuh uh, this is too powerful for you to use")
        }
    }
}