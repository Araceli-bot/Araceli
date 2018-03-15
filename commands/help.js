const Discord = require('discord.js');
const Command = require("../src/Command");

class help extends Command
{

    constructor(client) {
        super("help", ":question: | Help", ["Help"], "{prefix}help", "Use {prefix}help to return this list! Example: {prefix}help");
        this.client = client;
    }

    /*
    { Account:
   [ { command: 'account' },
     myinfo: { command: 'myinfo' },
     profile: { command: 'profile' } ],
  Anime:
   [ { command: 'anime' },
     hug: { command: 'hug' },
     kiss: { command: 'kiss' },
     neko: { command: 'neko' },
     pat: { command: 'pat' } ],
  Fun:
   [ { command: 'anime' },
     chuck: { command: 'chuck' },
     hug: { command: 'hug' },
     insult: { command: 'insult' },
     kiss: { command: 'kiss' },
     lizard: { command: 'lizard' },
     neko: { command: 'neko' },
     pat: { command: 'pat' },
     rate: { command: 'rate' },
     robomash: { command: 'robomash' },
     shakeinsult: { command: 'shakeinsult' },
     ship: { command: 'ship' },
     shouldi: { command: 'shouldi' },
     spoon: { command: 'spoon' },
     throw: { command: 'throw' },
     yoda: { command: 'yoda' },
     yomama: { command: 'yomama' },
     zalgo: { command: 'zalgo' } ],
  Information:
   [ { command: 'anime' },
     info: { command: 'info' },
     math: { command: 'math' },
     ping: { command: 'ping' },
     sysinfo: { command: 'sysinfo' } ],
  Help: [ { command: 'help' } ],
  System:
   [ { command: 'info' },
     ping: { command: 'ping' },
     sysinfo: { command: 'sysinfo' } ],
  Image:
   [ { command: 'lizard' },
     neko: { command: 'neko' },
     robomash: { command: 'robomash' } ] }
    */

    execute(message, args, bot) {
        var categories = bot.CommandManager.help;
        var messages = [];
        for(let i = 0; i < Object.keys(categories).length; i++){
            var categoryName = Object.keys(categories)[i];
            var commandsArray = categories[Object.keys(categories)[i]];
            var commands = "";
            commandsArray.forEach(elem => {
                commands += "`" + elem.command + "` ";
            });
            messages.push({name: categoryName, commands: commands});
        }
        var embed = this.makeEmbed(messages);
        message.channel.send({embed});
    }

    makeEmbed(msgs){
        var embed = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random()*16777215).toString(16))
        .setFooter("Araceli 2017-2018")
        .setTimestamp()
        .setTitle(":question: | Help:")
        .setAuthor("Araceli");
        for(var m = 0; m < msgs.length; m++){
            embed.addField(msgs[m].name, msgs[m].commands);
        }
        return embed;
    }
}

module.exports = help;
