const Discord = require('discord.js');
const Command = require("../src/Command");

class ping extends Command{

    constructor(client) {
        super("ping", ":gear: | Ping", {}, "{prefix}ping", "Use {prefix}ping to get your ping to Araceli! Example: {prefix}ping");
        this.client = client
    }

    execute(message, args, bot) {
        var diff = new Date() - message.createdAt;

        var embed = this.embed(":hourglass: | PONG! Your message got to me in " + diff + "ms!");
        message.channel.send({embed});
    }
}

module.exports = ping;
