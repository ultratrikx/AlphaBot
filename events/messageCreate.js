const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;
    
    // if (message.content == '.ad'){
    //     var i = 1;                  //  set your counter to 1
    //     function myLoop() {         //  create a loop function
    //     setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    //         console.log('hello');   //  your code here
    //         i++;                    //  increment the counter
    //         if (i < 10) {           //  if the counter < 10, call the loop function
    //         myLoop();             //  ..  again which will trigger another 
    //         }                       //  ..  setTimeout()
    //     }, 3000*10)

    //     myLoop()
    //     }

    //     myLoop();                   //  start the loop
    // } else {
        const [cmd, ...args] = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(" ");

        const command = client.commands.get(cmd.toLowerCase());

        if (!command) return;
        await command.run(client, message, args);
    // }

});

