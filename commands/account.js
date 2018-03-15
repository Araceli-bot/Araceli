const Discord = require('discord.js');
const Command = require("../src/Command");

class account extends Command
{

    constructor(client, db) {
        super("account", ":gear: | Account", ["Account"], "{prefix}account <subcommand>", "Use {prefix}account to change your account details! Example: {prefix}account setbg boardwalk", 10);
        this.client = client;
        this.db = db;
        this.bgs = [
            "boardwalk",
            "default",
            "pokémon",
            "psychadelic",
            "shamrock",
            "sunshine"
        ];
    }

    execute(message, args, bot) {
        var cmd = this;
        if(args[0] === "setbg"){
            var found = this.bgs.find(function(element) {
                return element == args[1];
            });
            if(found !== undefined){
                this.db.updateUserBG(message.author.id, args[1], function(){
                    var embed = cmd.embed("Set your background image to " + args[1]);
                    message.channel.send({embed});
                })
            } else {
                message.reply("That background doesn't exist!");
            }
        } else if(args[0] === "listbgs") {
            var msg = "";
            this.bgs.forEach(elem => {
                msg += elem + ", ";
            });
            message.reply(msg);
        } else {
            message.reply("Use `account <subcmd>`!");
        }
    }
}

module.exports = account;
