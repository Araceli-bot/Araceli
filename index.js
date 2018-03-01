const Discord = require('discord.js');
const client = new Discord.Client();
const removePunctuation = require('remove-punctuation');
var mcData = require("minecraft-data")("1.8.8");
var html2json = require('html2json').html2json;
var request = require('request');
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;
const assert = require('assert');
var ON_DEATH = require('death')({uncaughtException: true, debug: true});

var list = require('badwords-list'),
    badwords = list.regex;
var swearjar = require('swearjar');

const commandmanager = require("./src/CommandManager");
var CommandManager;
const dbmngr = require("./src/DBManager");
var DBManager;

var filter = false;

var prefix = ">";
var commandPath = "./commands/";
var birthDay = "December 11, 2017";
var db = "admin";

// Database Name
const dbName = 'myproject';
const user = encodeURIComponent('');
const password = encodeURIComponent('');
const authMechanism = 'DEFAULT';
// Connection URL
const url = f('mongodb://%s:%s@138.68.50.241:27017/?authMechanism=%s',
  user, password, authMechanism);

var commands = [];
var onMessageRegisters = [];
init();

client.on('ready', () => {
  console.log('I am ready!');
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function init(){
    fs.readdir(commandPath, function(err, items) {
        DBManager = new dbmngr(url, db, client, this);
        for (let i = 0; i < items.length; i++) {
            var Plugin = require(commandPath + items[i]);
            var plugin = new Plugin(client, DBManager);
            if(typeof plugin.onLoad === "function"){
                plugin.onLoad();
            }
            if(typeof plugin.onMessage === "function"){
                onMessageRegisters.push(i);
            }
            commands.push(plugin);
            console.log("Loaded plugin " + commandPath + items[i]);
        }
        CommandManager = new commandmanager(commands, this, client, prefix, url, DBManager);
        client.login('Mzg5OTE2OTA0NTgxNDk2ODMy.DRCiSw.-2ufxbzuab7fVIi2Re62UvUnW28');
    });
}

this.filterMemesValue = function(value, obj) {
    return obj["memes"].filter((object) => {
        return object["name"] == value;
    });
}

this.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*ON_DEATH(function(signal, err) {
    console.log("\nBye bye!");
})*/

client.on('message', message => {
    for (let i = 0; i < onMessageRegisters.length; i++) {
        commands[onMessageRegisters[i]].onMessage(message, this);
    }
    if(message.author.bot === false){
        var search = {user: message.author.id};
        DBManager.findDocuments(search, "users", function(docs){
            if(docs.length === 0){
                var insertionData = {
                    user: message.author.id,
                    userAvatar: message.author.avatarURL,
                    bot: message.author.bot,
                    displayAvatarURL: message.author.displayAvatarURL,
                    fullUsername: message.author.username + "#" + message.author.discriminator,
                    username: message.author.username,
                    xp: 0,
                    profileBackground: null,
                    money: 2000,
                    reputation: 0
                };
                DBManager.insertDocument(insertionData, function(res){
                    handleCommands(message);
                });
            } else {
                DBManager.getUser(message.author.id, function(response){
                    var user = response[0];
                    var xp = user.xp += Math.ceil(message.content.length / 5);
                    var money = user.money += Math.ceil(message.content.length / 5);
                    //userID, Xp, Money, rep, callback
                    DBManager.updateUserCurrencyData(message.author.id, xp, money, 0, function(resp){
                        handleCommands(message);
                    });
                });
            }
        });
    }
});

function handleCommands(message){
    if(message.content === "->slap <@389916904581496832>"){
        message.reply(":raised_back_of_hand: *Slaps " + message.author.username + "* Really? Please... -_-");
    } else if(message.content.search("🆙") === 0){
        message.channel.send("https://giphy.com/gifs/scott-pilgrim-michael-cera-level-up-qUDenOaWmXImQ");
    }
    var splitMSG = message.content.split(" ");
    var command = splitMSG.shift();
    if(command.split("")[0] === prefix) {

        while(command.charAt(0) === prefix)
        {
            command = command.substr(1);
        }
        var args = splitMSG;

        if(filter === true) {
            message.content = removePunctuation(message.content.toLowerCase());
            if(swearjar.profane(message.content) || message.content.match(badwords)) {
                message.author.createDM().then((channel) => {
                    channel.send("Hey! Profanity isn't allowed here! ```\"" + message.content + "\"``` contains profanity. Please stop")
                    message.delete();
                });
            }
        }
        CommandManager.execute(command, message, args, this);
    }
}
