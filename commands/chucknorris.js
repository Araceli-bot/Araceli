const Discord = require('discord.js');
const Command = require("../src/Command");

class chucknorris extends Command{

    constructor(client) {
        super("chuck", ":boom: | Chuck Norris", {}, "{prefix}chuck", "Use {prefix}chuck to get a random Chuck Norris ~~joke~~ fact! Example: {prefix}chuck", 10);
        this.client = client
    }

    execute(message, args, bot) {
        const cq = require("chucknorris-quotes");
        cq.getRandomJoke().then((response) => {
            var embed = this.embed(response.data.value.joke);
            message.channel.send({embed});
        });
    }
}

module.exports = chucknorris;
