const Discord = require('discord.js');
const Command = require("../src/Command");

class chucknorris extends Command{

    constructor(client) {
        super("chuck", {}, "{prefix}chuck", "Use {prefix}chuck to get a random Chuck Norris ~~joke~~ fact! Example: {prefix}chuck");
        this.client = client
    }

    execute(message, args, bot) {
        const cq = require("chucknorris-quotes");
        cq.getRandomJoke().then((response) => {
            var embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setDescription(response.data.value.joke)
            .setFooter("Araceli Copyright 2017-2018")
            /*
            * Takes a Date object, defaults to current date.
            */
            .setTimestamp()
            .setTitle("Chuck norris:")
            .setAuthor("The Norris")
            message.channel.send({embed});
        });
    }
}

module.exports = chucknorris;
