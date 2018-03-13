const Discord = require('discord.js');
const Command = require("../src/Command");

class shakesult extends Command
{

    constructor(client) {
        super("shakeinsult", ":fire: | Shakespeare Insult", {}, "{prefix}shakeinsult", "Use {prefix}shakeinsult to insult things Shakespeare style! Example: {prefix}shakeinsult");
        this.client = client
    }

    execute(message, args, bot) {
        const spi = require('shakespeare-insult');
        var embed = this.embed(spi.random());
        message.channel.send({embed});
    }
}

module.exports = shakesult;
