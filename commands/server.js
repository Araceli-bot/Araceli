const Discord = require('discord.js');
const Command = require("../src/Command");

class server extends Command{

    constructor(client) {
        super("server", {}, "{prefix}server {server address}", "Use {prefix}server to get info on a minecraft server. Example: {prefix}server sg.lbsg.net:19132");
        this.client = client
    }

    execute(message, args, bot) {
        var content = message.content;
        var request = require('request');
        if(args.length === 0) {
            var address = "entropype.mcpe.me:19132";
        } else {
            var address = args[0];
        }
        request.get({url: "https://api.mcsrvstat.us/1/" + address}, function (error, response, body) {
            var data = JSON.parse(body);
            if(data.offline === true){
                var embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription("This server is currently offline.")
                .setFooter("Araceli Copyright 2017-2018")
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setTitle("Entropy stats:")
                .setAuthor("Entropy")
                message.channel.send({embed});
            } else {
                if(data.players.list == undefined){
                    data.players.list = "No Players";
                }
                var embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setDescription("• MOTD: " + data.motd.clean + "\n" +
                "• Address: " + address + "\n" +
                "• Players: " + data.players.online + "/" + data.players.max + "\n" +
                "• Version: " + data.version + "\n" +
                "• Software: " + data.software + "\n" +
                "• Map: " + data.map + "\n" +
                "• Player list: " + data.players.list + "\n"
                //"• Game: " + message.author.presence.game.name + "\n" +
                )
                .setFooter("Araceli Copyright 2017-2018")
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setTitle("Entropy stats:")
                .setAuthor("Entropy")
                message.channel.send({embed});
            }
        });
    }
}

module.exports = server;
