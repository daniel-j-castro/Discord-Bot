import { Message, MessageEmbed } from "discord.js";

export default {
    callback: (message: Message, ...args: string[]) => {
        const embed = new MessageEmbed()
            .setDescription('Hello World!')
            .setTitle('Title')
            .setColor('GREEN')
            .setFooter({
                text: 'Footer'
            },)
            .addFields([
                {
                    name: 'name',
                    value: 'value',
                },
                {
                    name: 'name 2',
                    value: 'value 2',
                }
            ])
        message.channel.send({embeds: [embed]})
        console.log(message.channel.toString())
    }   
}