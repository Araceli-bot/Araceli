const Discord = require('discord.js');
const Command = require("../src/Command");

class help extends Command
{

    constructor(client) {
        super("help", ":question: | Help", {}, "{prefix}help", "Use {prefix}help to return this list! Example: {prefix}help");
        this.client = client;
    }

    execute(message, args, bot) {
        var commands = bot.CommandManager.commands;
        var helpMsgs = [];
        for(var i = 0; i < commands.length; i ++){
            helpMsgs[i] = {help: commands[i].help, name: commands[i].displayName};
        }
        var embed = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setFooter("Araceli 2017-2018")
        .setTimestamp()
        .setTitle(":question: | Help:")
        .setAuthor("Araceli");
        for(var m = 0; m < helpMsgs.length; m++){
            embed.addField(helpMsgs[m].name, helpMsgs[m].help);
        }
        message.channel.send({embed});
    }
}

module.exports = help;
