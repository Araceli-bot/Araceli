const Discord = require('discord.js');

class Message
{

    constructor(commandName, displayName)
    {
        this.commandName = commandName;
        this.displayName = displayName;
    }

    embed(body, image = null, thumbnail = null, url = null, file = null, nsfw = false, channel = null)
    {
        if((nsfw === true && channel !== null && channel.nsfw === true) || nsfw === false){
            var embed = new Discord.RichEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setDescription(body)
            .setFooter("Araceli 2017-2018")
            .setTimestamp()
            .setTitle(this.displayName + ":")
            .setAuthor("Araceli");
            if(image !== null){
                embed.setImage(image);
            }
            if(thumbnail !== null){
                embed.setThumbnail(thumbnail);
            }
            if(url !== null){
                embed.setURL(url);
            }
            if(file !== null){
                embed.attachFile(file);
            }
            return embed;
        } else {
            var embed = new Discord.RichEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setFooter("Araceli 2017-2018")
            .setTimestamp()
            .setTitle(":octagonal_sign: | Hey, that's only for NSFW channels!")
            .setAuthor("Araceli");
            return embed;
        }
    }

    multiEmbed(fields, description, image = null, thumbnail = null, url = null, file = null, nsfw = false, channel = null)
    {
        if((nsfw === true && channel !== null && channel.nsfw === true) || nsfw === false){
            var embed = new Discord.RichEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setFooter("Araceli 2017-2018")
            .setTimestamp()
            .setTitle(this.displayName + ":")
            .setAuthor("Araceli");
            if(image !== null){
                embed.setImage(image);
            }
            if (description !== null) {
                embed.setDescription(description)
            }
            if(thumbnail !== null){
                embed.setThumbnail(thumbnail);
            }
            if(url !== null){
                embed.setURL(url);
            }
            if(file !== null){
                embed.attachFile(file);
            }
            fields.forEach(elem => {
                if(elem.value == undefined || elem.value == '' || elem.value == null){elem.value = "No Data"};
                console.log(elem)
                embed.addField(elem.name, elem.value);
            });
            return embed;
        } else {
            var embed = new Discord.RichEmbed()
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setFooter("Araceli 2017-2018")
            .setTimestamp()
            .setTitle(":octagonal_sign: | Hey, that's only for NSFW channels!")
            .setAuthor("Araceli");
            return embed;
        }
    }

}

module.exports = Message;
