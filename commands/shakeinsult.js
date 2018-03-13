const Discord = require('discord.js');
const Command = require("../src/Command");

class shakesult extends Command
{

    constructor(client) {
        super("yomama", ":fire: :woman: | YO MAMA Joke", {}, "{prefix}yomama", "Use {prefix}yomama to insult things YO MAMA style! Example: {prefix}yomama <person>");
        this.client = client
    }

    execute(message, args, bot) {
        const yoMamma = require('yo-mamma').default;
        if(args.length > 0){
            var embed = this.embed(args[0] + ", " + yoMamma());
            message.channel.send({embed});
        } else {
            var embed = this.embed(yoMamma());
            message.channel.send({embed});
        }
    }
}

module.exports = shakesult;
