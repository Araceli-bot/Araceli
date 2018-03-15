const Discord = require('discord.js');
const Command = require("../src/Command");

class Throw extends Command
{

    constructor(client) {
        super("shouldi", ":thinking: | Should I?", ["Fun"], "{prefix}shouldi <do this?>", "Use {prefix}shouldi to ask Araceli what you should do (don't take her seriously)! Example: {prefix}shouldi \"Eat Some Ice Cream?\"");
        this.client = client
    }

    execute(message, args, bot) {
        var choices = [
            "Definitely!",
            "JUST DO IT!",
            "I don't know about that...",
            "Nah.",
            "No way!",
            "I wouldn't.",
            "Hmmm I'm not sure.",
            "Why not?",
            "Ask later."
        ];
        var choice = choices[Math.floor(Math.random()*choices.length)];
        var question = "";
        for(var i = 0; i < args.length; i++){
            question += args[i] + " ";
        }
        if(args.length > 0){
            var embed = this.embed("    Should I " + question + "\n" + choice);
            message.channel.send({embed});
        } else {
            var embed = this.embed(choice);
            message.channel.send({embed});
        }
    }
}

module.exports = Throw;
