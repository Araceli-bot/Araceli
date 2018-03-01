const Discord = require('discord.js');
const Command = require("../src/Command");

class insult extends Command
{

    constructor(client) {
        super("insult", {}, "{prefix}insult <item>", "Use {prefix}insult to insult things! Example: {prefix}insult \"My Life\"");
        this.client = client
    }

    execute(message, args, bot) {
        var content = message.content;
        content = content.substr(1);
        var arr = content.split('"');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == '' || arr[i] == ' ') {
                arr.splice(i, 1);
                i--;
            }
        }
        arr.shift();
        if(arr.length > 0){
            const InsultCompliment = require("insult-compliment");
            var embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setDescription(arr[0] + ", " +InsultCompliment.Insult())
            .setFooter("Araceli Copyright 2017-2018")
            /*
            * Takes a Date object, defaults to current date.
            */
            .setTimestamp()
            .setTitle("Insult:")
            .setAuthor("Insult generator")
            message.channel.send({embed});
        } else {
            message.reply("Give me someone or something to insult!");
        }
    }
}

module.exports = insult;
