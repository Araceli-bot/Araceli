const cq = require(__dirname + "/CooldownQueue");
var CooldownQueue = new cq();
const Discord = require('discord.js');

class CommandManager
{
    constructor(commands, bot, client, prefix, dbUrl, DBManager){
        this.commands = commands;
        this.bot = bot;
        this.client = client;
        this.prefix = prefix;
        this.url = dbUrl;
        this.DBManager = DBManager;
        this.helpMessage = "```css\nHelp Legend:\n{}: indicates optional argument\n[]: indicates unlimited args that must be surrounded by \"\"\n(): indicates an unlimited number of arguments that don't need \"\"\n<>: indicates an argument\n\n====Help====\n{help}```";
        this.help = "";
        this.commandList = "\n";
        for (let i = 0; i < this.commands.length; i++) {
            this.commands[i].help = this.commands[i].help.replaceAll("{prefix}", this.prefix);
            this.commands[i].usage = this.commands[i].usage.replaceAll("{prefix}", this.prefix);
            this.help += this.commands[i].commandName + ": " + this.commands[i].help + "\n";
            this.commandList += "`" + this.commands[i].commandName + "`" + "\n";
        }
        this.helpMessage = this.helpMessage.replaceAll("{help}", this.help);
    }

    execute(command, message, args, bot){
        /*if(command === "help"){
            if(args.length > 0){
                var reply = false;
                var command;
                for (let i = 0; i < this.commands.length; i++) {
                    if(this.commands[i].commandName === args[0]){
                        reply = true;
                        command = this.commands[i];
                    }
                }
                if(reply === true){
                    message.reply("Help for " + args[0] + ":\nHelp: " + command.help + "\n```Usage:\n" + command.usage + "```");
                } else {

                }
            } else {
                message.reply(this.helpMessage);
            }
        } else if(command === "commands") {
            message.reply(this.commandList);
        } else {*/
        command = command.toLowerCase();
        for (let i = 0; i < this.commands.length; i++) {
            if(this.commands[i].commandName === command){
                if(CooldownQueue.inQueue(message.author, command) === false){
                    CooldownQueue.addToQueue(message.author, command, this.commands[i].cooldownTime);
                    this.commands[i].execute(message, args, bot);
                } else if(CooldownQueue.inQueue(message.author, command) === true) {
                    if(message.author.id == 229035260069937153){
                        var embed = new Discord.RichEmbed()
                        .setColor(Math.floor(Math.random()*16777215).toString(16))
                        .setFooter("Araceli 2017-2018")
                        .setTimestamp()
                        .setTitle(":snowman: | My Papa doesn't get cooldowns :smiley:")
                        .setAuthor("Araceli");
                        message.channel.send({embed});
                        this.commands[i].execute(message, args, bot);
                    } else {
                        var embed = new Discord.RichEmbed()
                        .setColor(Math.floor(Math.random()*16777215).toString(16))
                        .setFooter("Araceli 2017-2018")
                        .setTimestamp()
                        .setTitle(":snowman: | Chill out! You still have `" + CooldownQueue.getTimeLeft(message.author, command) + "` seconds left!")
                        .setAuthor("Araceli");
                        message.channel.send({embed});
                    }
                }
            }
        }
        //}
    }
}

module.exports = CommandManager;
