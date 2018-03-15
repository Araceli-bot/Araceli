const Discord = require('discord.js');
const Command = require("../src/Command");

class spoon extends Command
{

    constructor(client, db) {
        super("spoon", ":spoon: | Spoon", ["Fun"], "{prefix}spoon", "Use {prefix}spoon to get a random PMMP spoon name! Example: {prefix}spoon");
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var words = [
            "Mine",
            "Shaft",
            "Clear",
            "Sky",
            "Pocket",
            "Pro",
            "Plus",
            "Block",
            "Frontier",
            "Nether",
            "Game",
            "Games",
            "Spoon"
        ];

        var length = Math.floor(Math.random() * (5 - 2) + 2);
        var ret = "";
        for(var i = 0; i < length; i++){
            ret += words[Math.floor(Math.random() * (words.length - 1))];
            if(Math.floor(Math.random() * 1) === 1){
                ret += " ";
            }
        }
        var embed = this.embed(ret);
        message.channel.send({embed});
    }

}

module.exports = spoon;
