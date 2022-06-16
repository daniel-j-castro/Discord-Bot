import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.on('ready', () => {
    console.log('The bot is on!');
    console.log('Have Fun!');

    const guildID = '796199760264298547';
    const guild = client.guilds.cache.get(guildID);
    let commands;
    if (guild){
        commands = guild.commands;
    }
    else{
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.',
    });

    commands?.create({
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'num1',
                description: 'The first number.',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: 'num2',
                description: 'The second number.',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            }
        ],
    });
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()){
        return;
    }
    const {commandName, options} = interaction;

    if(commandName === 'ping'){
        interaction.reply({
            content: 'pong',
            ephemeral: false,
        });
    }
    else if (commandName === 'add'){
        const num1 = options.getNumber('num1')!;
        const num2 = options.getNumber('num2')!;
        
        await interaction.deferReply({
           ephemeral: false 
        });

        await new Promise(resolve => setTimeout(resolve, 5000));

        interaction.editReply({
            content: `The sum is ${num1 + num2}`,
        });
    }
});

client.on('messageCreate', (message) => {
    if (message.content === 'ping'){
        message.reply({
            content: "Pong!",
        });
    }
});

client.login(process.env.TOKEN);