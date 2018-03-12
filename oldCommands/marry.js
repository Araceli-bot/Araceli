var Jimp = require("jimp");
const Discord = require('discord.js');
const Command = require("../src/Command");

class marry extends Command
{

    constructor(client, db) {
        super("marry", ":wedding: | Marriage", {}, "{prefix}marry <user>", "Use {prefix}marry to get hitched to someone! Example: {prefix}marry @Araceli#8187");
        this.client = client;
        this.db = db;
        this.waitingOnResponse = [];
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var spouse = args[0];
        var proposer = message.author;
        var embed = this.embed(spouse + ", <@" + message.author.id + "> would like to marry you. Send `yes` to accept or `no` to deny.");
        message.channel.send({embed});
        this.waitingOnResponse.push([proposer, spouse]);
    }

    onMessage(message, bot) {
        var cmd = this;
        for (let i = 0; i < this.waitingOnResponse.length; i++) {
            if("<@"+message.author.id+">" === this.waitingOnResponse[i][1]){
                if(message.content.toLowerCase() === "yes"){
                    if(message.guild.available === true){
                        var id = message.guild.id;
                    } else {
                        var id = null;
                    }
                    var user1 = {
                        username: message.author.username,
                        userID: message.author.id,
                        guild: id,
                        spouse: this.waitingOnResponse[i][0].username,
                        spouseID: this.waitingOnResponse[i][0].id,
                    };
                    var user2 = {
                        username: this.waitingOnResponse[i][0].username,
                        userID: this.waitingOnResponse[i][0].id,
                        guild: id,
                        spouse: message.author.username,
                        spouseID: message.author.id,
                    };
                    var proposer = this.waitingOnResponse[i][0].id;
                    this.db.createMarriage(user1, user2, function(){
                        var embed = cmd.embed(":fireworks::tada: <@" + message.author.id + "> has accepted the marriage proposal of <@" + proposer + ">! :tada::fireworks:");
                        message.channel.send({embed});
                    });
                } else if(message.content.toLowerCase() === "no") {
                    var embed = cmd.embed(":broken_heart: Sorry, <@" + this.waitingOnResponse[i][0].id + ">, but <@" + message.author.id + "> doesn't want to marry you. :broken_heart:");
                    message.channel.send({embed});
                }
            }
        }
    }
}

module.exports = marry;
