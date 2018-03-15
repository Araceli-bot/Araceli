const Discord = require('discord.js');
const Command = require("../src/Command");
const NekoJS = require("neko.js");

class neko extends Command
{

    constructor(client, db) {
        super("neko", ":smile_cat: | Neko", ["Anime", "Image", "Fun"], "{prefix}neko", "Use {prefix}neko to get a random neko image! Example: {prefix}neko", 10);
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        let nekoclient = new NekoJS.Client();
        nekoclient.neko().then(function(nekoImg){
            var embed = cmd.embed("", nekoImg.neko);
            message.channel.send({embed});
        });
    }

}

module.exports = neko;
