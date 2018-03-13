const Discord = require('discord.js');
const Command = require("../src/Command");
const NekoJS = require("neko.js");

class neko extends Command
{

    constructor(client, db) {
        super("lizard", ":lizard: | Lizard", {}, "{prefix}lizard", "Use {prefix}lizard to get a random lizard image! Example: {prefix}lizard", 10);
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        let nekoclient = new NekoJS.Client();
        nekoclient.lizard().then(function(lizard){
            var embed = cmd.embed("", lizard.url);
            message.channel.send({embed});
        });
    }

}

module.exports = neko;
