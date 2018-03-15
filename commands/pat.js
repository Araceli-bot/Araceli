const Discord = require('discord.js');
const Command = require("../src/Command");
const NekoJS = require("neko.js");

class pat extends Command
{

    constructor(client, db) {
        super("pat", ":wave: | Pat", ["Anime", "Fun"], "{prefix}pat", "Use {prefix}pat to get a random pat gif! Example: {prefix}pat", 10);
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        let nekoclient = new NekoJS.Client();
        nekoclient.pat().then(function(pat){
            var embed = cmd.embed("", pat.url);
            message.channel.send({embed});
        });
    }

}

module.exports = pat;
