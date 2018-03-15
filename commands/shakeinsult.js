const Discord = require('discord.js');
const Command = require("../src/Command");

class shakesult extends Command
{

    constructor(client) {
        super("shakeinsult", ":fire: | Shakespeare Insult", ["Fun"], "{prefix}shakeinsult", "Use {prefix}shakeinsult to insult things Shakespeare style! Example: {prefix}shakeinsult <person>");
        this.client = client
    }

    execute(message, args, bot) {
        const shake = require('shakespeare-insult');
        if(args.length > 0){
            var text = "";
            args.forEach(elem => {
                text += elem + " ";
            });
            var embed = this.embed(text + " you " + shake.random());
            message.channel.send({embed});
        } else {
            var embed = this.embed(shake.random());
            message.channel.send({embed});
        }
    }
}

module.exports = shakesult;
