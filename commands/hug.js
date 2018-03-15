const Discord = require('discord.js');
const Command = require("../src/Command");
const NekoJS = require("neko.js");

class pat extends Command
{

    constructor(client, db) {
        super("hug", ":hugging: | Hug", ["Anime", "Fun"], "{prefix}hug", "Use {prefix}hug to get a random hug gif! Example: {prefix}hug", 10);
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        let nekoclient = new NekoJS.Client();
        nekoclient.hug().then(function(hug){
            var embed = cmd.embed("", hug.url);
            message.channel.send({embed});
        });
    }

}

module.exports = pat;
