//const Command = require("");
const Discord = require('discord.js');
const Command = require("../src/Command");

class myinfo extends Command{

    constructor(client) {
        super("myinfo", ":mag: | Your info", ["Account"], "{prefix}myinfo", "Use {prefix}myinfo to get your Discord info! Example: {prefix}myinfo");
        this.client = client
    }

    execute(message, args, bot) {
        var roles = message.member.roles.array()
        var roleString = "";
        var i = 0;
        for(i in roles) {
            roleString += "`" + roles[i].name + "`, "
        }
        var description = "• Username: " + message.author.username + "\n" + "• Id: " + message.author.id + "\n" + "• Full Discord Tag: " + message.author.username + "#" + message.author.discriminator + "\n" + "• Avatar URL: " + message.author.avatarURL + "\n" +
        "• Is A Bot: " + message.author.bot + "\n" + "• Joined on: " + message.author.createdAt + "\n" + "• Status: " + message.author.presence.status + "\n" + "• Roles: " + roleString
        var embed = this.embed(description, message.author.displayAvatarURL, message.author.displayAvatarURL, message.author.displayAvatarURL);
        message.channel.send({embed});
    }
}

module.exports = myinfo;
