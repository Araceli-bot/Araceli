const Discord = require('discord.js');
const Command = require("../src/Command");

class ship extends Command
{

    constructor(client) {
        super("ship", ":package: | Ship", ["Fun"], "{prefix}ship [<item> <item> <item>...]", "Use {prefix}ship to see if I ship things! Example: {prefix}ship \"Me\" \"You\"");
        this.client = client
    }

    onLoad() {
        this.log("Loaded!");
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
        if(args.length > 0 && arr.length > 0){
            var ratings = [];
            for(var i = 0; i < arr.length; i++){
                var rating = Math.floor(Math.random() * 101);
                if(rating > 50){
                    var msg = arr[i] + ": :heart: I ship it!";
                } else {
                    var msg = arr[i] + ": :broken_heart: I Don't ship it!"
                }
                ratings[i] = msg;
            }
            var description = "";
            for(var i = 0; i < ratings.length; i++){
                description += ratings[i] + "\n";
            }
            var embed = this.embed(description);
            message.channel.send({embed});
        } else {
            message.reply('I need something to rate!');
        }
    }
}

module.exports = ship;
