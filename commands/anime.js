const Discord = require('discord.js');
const Command = require("../src/Command");

class anime extends Command{

    constructor(client) {
        super("anime", ":flag_jp: | Anime Info", ["Anime", "Fun", "Information"], "{prefix}anime <term>", "Use {prefix}anime <term> to get info on <term> from AniList! Example: {prefix}anime Seven Deadly Sins");
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
            var synonyms = "";
            data.synonyms.forEach(elem => {
                synonyms += elem + ", "
            });
            var scoreBreakDown = "Score amount: Number of voters\n";
            for (let i = 0; i < Object.keys(data.score_distribution).length; i++) {
                scoreBreakDown += "\t" + Object.keys(data.score_distribution)[i] + ": " + data.score_distribution[Object.keys(data.score_distribution)[i]]+ "\n";
            }
            var animeFields = [
                {name: "Name: ", value: data.title_english},
                {name: "Name (Japanese): ", value: data.title_japanese},
                {name: "Score: ", value: data.average_score + "/100"},
                {name: "Score Breakdown: ", value: scoreBreakDown},
                {name: "Rating: ", value: data.classification},
                {name: "Genres: ", value: genres},
                {name: "Also know as: ", value: synonyms},
            ]
            //console.log(data);
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
