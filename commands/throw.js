const Discord = require('discord.js');
const Command = require("../src/Command");

class Throw extends Command
{

    constructor(client) {
        super("throw", ":comet: | Throw", ["Fun"], "{prefix}throw <target thing> <target location>", "Use {prefix}throw to throw things! Example: {prefix}throw \"My Life\" \"Out the window\"");
        this.client = client
    }

    execute(message, args, bot) {
        var choices = [
            "spiked",
            "tossed",
            "bounced",
            "under-handed",
            "threw"
        ];
        var choice = choices[Math.floor(Math.random()*choices.length)];
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
            var embed = this.embed("<@" + message.author.id + "> " + choice + " " + arr[0] + " to " + arr[1]);
            message.channel.send({embed});
        } else {
            message.reply("Give me someone or something to throw!");
        }
    }
}

module.exports = Throw;
