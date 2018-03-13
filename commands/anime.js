const Discord = require('discord.js');
const Command = require("../src/Command");

class anime extends Command{

    constructor(client) {
        super("anime", ":flag_jp: | Anime Info", {}, "{prefix}anime <term>", "Use {prefix}anime <term> to get info on <term> from AniList! Example: {prefix}anime Seven Deadly Sins");
        this.client = client
    }

    execute(message, args, bot) {
        var decode = require('unescape');
        var nani = require('nani').init(bot.aniid, bot.anisecret);
        var term = "";
        args.forEach(elem => {
            term += elem + " ";
        });
        nani.get('anime/search/' + encodeURIComponent(term))
        .then(data => {
            data = data[0];
            var genres = "";
            data.genres.forEach(elem => {
                genres += elem + ", "
            });
            var animeFields = [
                {name: "Name: ", value: data.title_english},
                {name: "Name (Japanese): ", value: data.title_japanese},
                {name: "Score: ", value: data.average_score + "/100"},
                {name: "Rating: ", value: data.classification},
                {name: "Genres: ", value: genres},
            ]
            var embed = this.multiEmbed(animeFields, decode(data.description.replaceAll("<br>", "\n")), data.image_url_banner, data.image_url_med);
            message.channel.send({embed});
        })
        .catch(error => {
            var embed = this.embed(error);
            message.channel.send({embed});
        });
    }
}

module.exports = anime;
