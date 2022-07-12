import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.on('ready', async () => {

    await mongoose.connect(process.env.MONGO_URI || '', 
    { 
        keepAlive: true,
        dbName: 'discord-bot',
    }).then(() => {
        console.log('connected to server')
    }).catch(err => {
        console.log('could not connect to the database...', err)
    })

    let handler = require('./command-handler');
    if(handler.default) handler = handler.default

    handler(client)

    let logger = require('./message-log');
    if(logger.default) logger = logger.default

    logger(client)

    console.log('The bot is on!');
    console.log('Have Fun!');

   
});

client.login(process.env.TOKEN);