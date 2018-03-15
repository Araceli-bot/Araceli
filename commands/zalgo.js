const Discord = require('discord.js');
const Command = require("../src/Command");

class zalgo extends Command
{

    constructor(client) {
        super("zalgo", ":open_mouth: | Zalgo!", ["Fun"], "{prefix}zalgo <text>", "Use {prefix}zalgo to zalgo things! Example: {prefix}zalgo My Life");
        this.client = client
    }

    execute(message, args, bot) {
        var text = "";
        args.forEach(elem => {
            text += elem + " ";
        });
        var zalgo = require("to-zalgo");
        var evil = zalgo(text);
        var embed = this.embed(evil);
        message.channel.send({embed});
    }
}

module.exports = zalgo;
