const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require('discord.js');

module.exports = {
    name: 'help',
    description: 'view all commands',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const emojis = {
            info: 'ℹ️',
            moderation: '🔧',
            // utility: '🧰',
            // fun: ''😎,
            // test: '🧪',
        };
        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];

        const formatString = (str) =>
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.directory === dir)
                .map((cmd) => {
                    return {
                        name:
                            cmd.name ||
                            'This command does not have a name',
                        description:
                            cmd.description ||
                            'This command does not have a description',
                    };
                });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new MessageEmbed().setDescription(
            'Please choose a category in the dropdown menu',
        );
        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('help-menu')
                    .setPlaceholder(
                        'Please Select A Command Category',
                    )
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from the ${cmd.directory} category`,
                                emoji:
                                    emojis[
                                        cmd.directory.toLowerCase()
                                    ] || null,
                            };
                        }),
                    ),
            ),
        ];

        const initalMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),
        });

        const filter = (interaction) =>
            interaction.user.id === message.author.id;

        const collector =
            message.channel.createMessageComponentCollector({
                filter,
                componentType: 'SELECT_MENU',
                /*time: 5000,*/
            });

        collector.on('collect', (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory,
            );

            const categoryEmbed = new MessageEmbed()
                .setTitle(`${directory} commands`)
                .setDescription('Here are the list of commands')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        };
                    }),
                );

            interaction.update({
                embeds: [categoryEmbed],
            });
        });

        collector.on('end', () => {
            initalMessage.edit({ components: components(true) });
        });
    },
};
