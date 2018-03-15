const Discord = require('discord.js');
const Command = require("../src/Command");
const NekoJS = require("neko.js");
const unirest = require("unirest");

class robomash extends Command
{

    constructor(client, db) {
        super("robomash", ":robot: | RoboMash", ["Image", "Fun"], "{prefix}robomash", "Use {prefix}robomash to get a robotified version of the text you supply! Example: {prefix}robomash I'm a robot", 10);
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        var text = "";
        args.forEach(elem => {
            text += elem + " ";
        });
        unirest.get("https://robohash.p.mashape.com/index.php?text=" + text)
        .header("X-Mashape-Key", "iptPEfdlwlmshsnJ9NGlVo0xWmLGp1idjCWjsn6j11qLntB6ip")
        .header("Accept", "application/json")
        .end(function (result) {
            var res = JSON.parse(result.body);
            var embed = cmd.embed("RoboMash:", res.imageUrl.replaceAll("\\", ""));
            message.channel.send({embed});
        });
    }

}

module.exports = robomash;
