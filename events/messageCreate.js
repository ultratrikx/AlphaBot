const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;
    
    if (message.content === '$ad'){
        var interval = setInterval (function () {
            message.channel.send("123")
            .catch(console.error); // add error handling here
        }, 1 * 1000); 
    }
    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase());

    if (!command) return;
    await command.run(client, message, args);
});

