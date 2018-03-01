var Jimp = require("jimp");
const Discord = require('discord.js');
const Command = require("../src/Command");

class profile extends Command
{

    constructor(client, db) {
        super("profile", {}, "{prefix}profile", "Use {prefix}profile to get your Araceli profile info. Example: {prefix}profile");
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        this.db.getUser(message.author.id, function(data){
            var user = data[0];
            Jimp.read(user.displayAvatarURL, function (err, profileImg) {
                var image = new Jimp(300, 300, 0x00000000, function (err, image) {
                    // this image is 300 x 300, every pixel is set to 0x00000000
                    profileImg.resize(300/2, 300/2)
                    image.composite( profileImg, 0, 0 );
                    Jimp.read("./images/Profile/default.png", function (err, bg) {
                        console.log(bg)
                        bg.composite(image, 0, 0);
                        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
                            image.print(font, 300/2, 256/4, user.username);
                            image.print(font, 300/2, 120, "XP: " + user.xp);
                            image.print(font, 300/2, 160, "Money: $" + user.money);
                            image.print(font, 300/2, 200, "Reputation: " + user.reputation);
                            image.getBuffer(Jimp.MIME_PNG, function(err, result){
                                message.channel.send("***Your profile:***", new Discord.Attachment(result, "profile.png"));
                            });
                        });
                    });
                });
            });
        })
    }
}

module.exports = profile;
