const Discord = require('discord.js');
const Command = require("../src/Command");

class yoda extends Command
{

    constructor(client) {
        super("yoda", ":frog: | Yoda Quote", ["Fun"], "{prefix}yoda", "Use {prefix}yoda for a wise quote! Example: {prefix}yoda");
        this.client = client
    }

    execute(message, args, bot) {
        var yodaSaid = require('yoda-said');
        var embed = this.embed(yodaSaid());
        message.channel.send({embed});
    }
}

module.exports = yoda;
