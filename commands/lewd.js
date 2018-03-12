const Discord = require('discord.js');
const Command = require("../src/Command");
const NekoJS = require("neko.js");

class neko extends Command
{

    constructor(client, db) {
        super("lewd", ":scream_cat: | Lewd Neko", {}, "{prefix}lewd", "Use {prefix}lewd to get a random lewd neko image! Example: {prefix}lewd", 10);
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        let nekoclient = new NekoJS.Client();
        nekoclient.LewdNeko().then(function(lewdNekoImg){
            var embed = cmd.embed("", lewdNekoImg.neko, null, null, null, true, message.channel);
            message.channel.send({embed});
        });
    }

}

module.exports = neko;
