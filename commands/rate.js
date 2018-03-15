const Discord = require('discord.js');
const Command = require("../src/Command");

class rate extends Command
{

    constructor(client) {
        super("rate", ":bar_chart: | Rate", ["Fun"], "{prefix}rate [<item> <item> <item>...]", "Use {prefix}rate to rate things! Example: {prefix}rate \"My Life\"");
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
                ratings[i] = 'I rate ' + arr[i] + " " + rating + '/100';
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

module.exports = rate;
