const Discord = require('discord.js');
const Command = require("../src/Command");
const NekoJS = require("neko.js");

class kiss extends Command
{

    constructor(client, db) {
        super("kiss", ":kissing_heart: | Kiss", {}, "{prefix}kiss", "Use {prefix}kiss to get a random kiss gif! Example: {prefix}kiss", 10);
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        let nekoclient = new NekoJS.Client();
        nekoclient.kiss().then(function(kiss){
            var embed = cmd.embed("", kiss.url);
            message.channel.send({embed});
        });
    }

}

module.exports = kiss;
