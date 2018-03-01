const Discord = require('discord.js');
const Command = require("../src/Command");

class math extends Command
{

    constructor(client) {
        super("math", {}, "{prefix}math [<math expression> <math expression>...]\n{prefix}math average (<number> <number> <number>)\n{prefix}math random <min> <max>", "Use {prefix}math when you're to lazy to *actually* do math! Example: {prefix}math \"2 + 2\"");
        this.client = client
    }

    execute(message, args, bot) {
        var content = message.content;
        var math = require('mathjs');
        if(args[0] === "random" || args[0] === "rand"){
            var max = parseInt(args[2]);
            var min = parseInt(args[1]);
            if(args.length === 3){
                var result = (Math.floor(Math.random() * (max - min + 1)) + min);
                message.reply(result);
            } else {
                message.reply('Usage: >math rand <min> <max>');
            }
        } else if(args[0] === "avg" || args[0] === "average"){
            args.shift();
            var average = 0;
            for(var i = 0; i < args.length; i++){
                average += parseInt(args[i]);
            }
            message.reply(average/args.length);
        } else {
            content = content.substr(1);
            var arr = content.split('"');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == '' || arr[i] == ' ') {
                    arr.splice(i, 1);
                    i--;
                }
            }
            arr.shift();
            if(arr.length !== 0){
                var results = [];
                for(var i = 0; i < arr.length; i++){
                    try {
                        results[i] = math.eval(arr[i]);
                    }
                    catch(err){
                        results[i] = err;
                    }
                }
                var description = "";
                for(var i = 0; i < results.length; i++){
                    var place = i + 1;
                    description += "Result for " + place + ": " + results[i] + "\n";
                }
                var embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription(description)
                .setFooter("Araceli Copyright 2017-2018")
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setTitle("Math results:")
                .setAuthor("Araceli")
                message.channel.send({embed});
            } else {
                var embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription("You must specify a math problem! Example: `>math \"1+1\"`")
                .setFooter("Araceli Copyright 2017-2018")
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setTitle("Math error:")
                .setAuthor("Araceli")
                message.channel.send({embed});
            }
        }
    }
}

module.exports = math;
