const Discord = require('discord.js');
const client = new Discord.Client();
var config;
var token;
var pref;
if(process.env.travis === undefined){
    config = require(`${process.cwd()}/config.js`);
    token = config.token;
    pref = config.prefix;
} else {
    token = process.env.token;
    pref = process.env.prefix
}
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
const activityManager = require("./src/ActivityManager");
const ActivityManager = new activityManager();
const cacheManager = require("./src/utils/CacheManager");
const CacheManager = new cacheManager();

var filter = false;

var prefix = pref;
var commandPath = "./commands/";
var birthDay = "December 11, 2017";

var queue = [];

var db;
var dbPort;
var dbName;
var user;
var password;
var authMechanism;

if(process.env.travis === undefined){
    // Database
    db = config.db;
    dbPort = config.dbPort;
    dbName = config.dbName;
    user = encodeURIComponent(config.dbUser);
    password = encodeURIComponent(config.dbPass);
    authMechanism = config.dbauthMechanism;
    anisecret = config.aniSecret;
    aniid = config.aniId;
} else {
    // Database
    db = process.env.dbIp;
    dbPort = process.env.dbPort;
    dbName = process.env.dbName;
    user = encodeURIComponent(process.env.dbUser);
    password = encodeURIComponent(process.env.dbPass);
    authMechanism = process.env.dbAuthMechanism;
    anisecret = null;
    aniid = null;
}

// Connection URL
const url = f('mongodb://%s:%s@%s:%s/?authMechanism=%s',
  user, password, db, dbPort, authMechanism);

var commands = [];
var onMessageRegisters = [];
init();

client.on('ready', () => {
    console.log('I am ready!');
    startActivityProcess();
    if(process.env.travis !== undefined){
        process.exit();
    }
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function init(){
    fs.readdir(commandPath, function(err, items) {
        DBManager = new dbmngr(url, dbName, client, this);
        CacheManager.setDb(DBManager);
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
        this.CommandManager = CommandManager;
        //console.log(CacheManager.get("users.1.username"));
        client.login(token);
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

this.lolReplace = [
    "I have nothing worthwhile to contribute to this conversation so I'll just say lol.",
    "I'm too lazy to read what you just wrote so I'm typing something useless (lol) in hopes that you'll think I'm still paying attention.",
    "Your statement lacks even the vaguest trace of humor but I'll pretend I'm amused. lol",
    "This is a pointless acronym I'm sticking in my sentence just because it's become so engraved into my mind that when chatting, I MUST use the meaningless sentence-filler 'lol.'"
];

client.on('message', message => {
    if(message.content.toLowerCase() == "lol" || message.content.toLowerCase() == "lel"){
        message.channel.send("What they meant by that is: " + this.lolReplace[Math.floor(Math.random() * (this.lolReplace.length - 1))]);
    } else {
        /*if(filter === true) {
            message.content = removePunctuation(message.content.toLowerCase());
            if(swearjar.profane(message.content) || message.content.match(badwords)) {
                message.author.createDM().then((channel) => {
                    channel.send("Hey! Profanity isn't allowed here! ```\"" + message.content + "\"``` contains profanity. Please stop")
                    message.delete();
                });
            }
        }*/
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
                    new Promise(function(resolve, reject){
                        DBManager.getUser(message.author.id, function(response){
                            var user = response[0];
                            var xp = user.xp += Math.ceil(message.content.length / 5);
                            var money = user.money += Math.ceil(message.content.length / 5);
                            //userID, Xp, Money, rep, callback
                            DBManager.updateUserCurrencyData(message.author.id, xp, money, 0, function(resp){

                            });
                        });
                    });
                    handleCommands(message);
                }
            });
        }
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

        CommandManager.execute(command, message, args, getBot());
    }
}

function getBot(){
    return this;
}

function startActivityProcess(){
    setInterval(function(){
        var activity = ActivityManager.getActivity();
        var guilds = client.guilds.array();
        var i = 0;
        var members = 0;
        for(i in guilds){
            members += guilds[i].memberCount;
        }
        var msg = activity.msg.replaceAll("%g", guilds.length)
        msg = msg.replaceAll("%m", members)
        client.user.setActivity(msg, {type: activity.type});
    }, 5000);
}
