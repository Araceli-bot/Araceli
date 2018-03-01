//const Command = require("");
const Discord = require('discord.js');
const Command = require("../src/Command");

class myinfo extends Command{

    constructor(client) {
        super("myinfo", {}, "{prefix}myinfo", "Use {prefix}myinfo to get your Discord info! Example: {prefix}myinfo");
        this.client = client
    }

    execute(message, args, bot) {
        var roles = message.member.roles.array()
        var roleString = "";
        var i = 0;
        for(i in roles) {
            roleString += roles[i] + ", "
        }
        var embed = new Discord.RichEmbed()
        //.setImage(message.author.displayAvatarURL)
        .setColor(0x00AE86)
        .setDescription("")
        .setFooter("Araceli Copyright 2017-2018", message.author.displayAvatarURL)
        .setThumbnail(message.author.displayAvatarURL)
        /*
        * Takes a Date object, defaults to current date.
        */
        .setTimestamp()
        .setTitle("Info on " + message.author.username)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription("• Username: " + message.author.username + "\n" +
        "• Id: " + message.author.id + "\n" +
        "• Full Discord Tag: " + message.author.username + "#" + message.author.discriminator + "\n" +
        "• Avatar URL: " + message.author.avatarURL + "\n" +
        "• Is A Bot: " + message.author.bot + "\n" +
        "• Joined on: " + message.author.createdAt + "\n" +
        "• Status: " + message.author.presence.status + "\n" +
        //"• Game: " + message.author.presence.game.name + "\n" +
        "• Roles: " + roleString
        )
        /*
        Information about the user ⊛ 𝖊𝕯𝖗𝖔𝖎𝖉 ⊛:
        • Username: ⊛ 𝖊𝕯𝖗𝖔𝖎𝖉 ⊛
        • ID: 193124101446041602
        • Discord Tag: ⊛ 𝖊𝕯𝖗𝖔𝖎𝖉 ⊛#2634
        • Avatar URL: https://cdn.discordapp.com/avatars/193124101446041602/1c670d397a9d74e401760e163bf35e3b.png?size=2048
        • Created at: Fri Jun 17 2016 00:06:13 GMT+0200 (CEST)
        • Bot?: false
        • Roles: @everyone, Notable Member
        • Game: None
        • Status: dnd
        */

        message.channel.send({embed});
    }
}

module.exports = myinfo;
