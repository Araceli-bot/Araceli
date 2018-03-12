const Discord = require('discord.js');
const Command = require("../src/Command");

class imgflip extends Command{

    constructor(client) {
        super("imgflip", {}, "{prefix}imgflip <imgflip meme template name> <text1> <text2>", "Use {prefix}imgflip to memeify things! Example: {prefix}imgflip \"One Does Not Simply\" \"One does not simply\" \"Use this command\"");
        this.client = client
    }

    execute(message, args, bot) {
        var content = message.content;
        var request = require('request');
        request.get({url: "https://api.imgflip.com/get_memes"}, function (error, response, body) {
            var memes = JSON.parse(body);
            content = content.substr(1);
            var arr = content.split('"');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == '' || arr[i] == ' ') {
                    arr.splice(i, 1);
                    i--;
                }
            }
            arr.shift();
            var name = arr.shift();
            var id = memes.data.memes.find(function(element) {
                return element.name.toLowerCase() == name.toLowerCase();
            });
            if(id == undefined){
                id = name;
            } else {
                id = id.id;
            }
            var data = {
    			template_id: id,
    			username: "bismuthboss",
    			password: "<Araceli123>",
    			text0: arr[0],
    			text1: arr[1]
    		};
            request.post({url: "https://api.imgflip.com/caption_image", form: data}, function (error, response, body) {
                var resp = JSON.parse(body);
                var image = resp.data.url;
                var page = resp.data.page_url;
                var embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setImage(image)
                .setDescription("")
                .setFooter("Araceli Copyright 2017-2018", "https://cdn.discordapp.com/avatars/389916904581496832/edd347a4b5835b6a23cc83a5f5e32b87.png")
                .setThumbnail("https://cdn.discordapp.com/avatars/389916904581496832/edd347a4b5835b6a23cc83a5f5e32b87.png")
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setTitle("Imgflip meme:")
                .setAuthor("Imgflip", "https://cdn.discordapp.com/avatars/389916904581496832/edd347a4b5835b6a23cc83a5f5e32b87.png")
                message.channel.send({embed});
            });
        });
    }
}

module.exports = imgflip;
