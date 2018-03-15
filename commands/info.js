const Discord = require('discord.js');
const Command = require("../src/Command");

class Info extends Command{

    constructor(client) {
        super("info", ":gear: | My info", ["Information", "System"], "{prefix}info", "Use {prefix}info to get Araceli's info! Example: {prefix}info");
        this.client = client
    }

    execute(message, args, bot) {
        var embed = this.embed("Hi! My name is Araceli (pronounced `are uh sell E`) and I'm a cutting-edge discord bot! I was born on December 11, 2017, and my creator is <@229035260069937153>.");
        message.channel.send({embed});
    }
}

module.exports = Info;
