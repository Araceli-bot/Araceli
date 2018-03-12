var Jimp = require("jimp");
const Discord = require('discord.js');
const Command = require("../src/Command");

class profile extends Command
{

    constructor(client, db) {
        super("profile", ":notebook_with_decorative_cover: | Profile", {}, "{prefix}profile", "Use {prefix}profile to get your Araceli profile info. Example: {prefix}profile");
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        this.db.getUser(message.author.id, function(data){
            var user = data[0];
            Jimp.read(user.displayAvatarURL, function (err, profileImg) {
                var image = new Jimp(300, 300, 0x00000000, function (err, image) {
                    // this image is 300 x 300, every pixel is set to 0x00000000
                    profileImg.resize(300/2, 300/2)
                    image.composite( profileImg, 0, 0 );
                    var bg = user.profileBackground;
                    if(bg === null){
                        bg = "default";
                    }
                    Jimp.read("./images/Profile/" + bg + ".png", function (err, bg) {
                        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
                            image.print(font, 300/2, 256/4, user.username);
                            image.print(font, 300/2, 120, "XP: " + user.xp);
                            image.print(font, 300/2, 160, "Money: $" + user.money);
                            image.print(font, 300/2, 200, "Reputation: " + user.reputation);
                            bg.composite(image, 0, 0);
                            bg.getBuffer(Jimp.MIME_PNG, function(err, result){
                                var embed = cmd.embed("", "attachment://profile.png", null, null, new Discord.Attachment(result, "profile.png"));
                                message.channel.send({embed});
                            });
                        });
                    });
                });
            });
        })
    }
}

module.exports = profile;
