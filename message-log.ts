import { Client, Message, TextChannel } from 'discord.js'
import logSchema from './models/log-schema';

export default (client: Client) => {
    client.on('messageDelete', async (message) => {
        const { author, content, id, channelId, channel, createdTimestamp, guildId } = message
        let date = new Date(createdTimestamp)
        let formattedDate = (((date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)+ "/" + 
                            (date.getDay().toString().length == 1 ? '0' + date.getDay() : date.getDay()) + "/" + date.getFullYear())
        await new logSchema({
            message: content,
            messageId: id,
            author: author!.username,
            authorId: author!.id,
            channel: (channel as TextChannel)!.name,
            channelId: channelId,
            guild: (channel as TextChannel)!.guild.name,
            guildId: guildId,
            timestamp: formattedDate,
        }).save()
        
        console.log(message.channel)

        message.channel.send('message with content "'+ content +'" deleted!')
    })
};
