const Discord = require('discord.js');
const Command = require("../src/Command");
const si = require('systeminformation');
const RB = require('readable-bytes');

class sysinfo extends Command
{

    constructor(client, db) {
        super("sysinfo", ":gear: | SysInfo", {}, "{prefix}sysinfo", "Use {prefix}sysinfo to get info on the Araceli bot. Example: {prefix}sysinfo", 5);
        this.client = client;
        this.db = db;
    }

    onLoad() {
        this.log("Loaded!");
    }

    execute(message, args, bot) {
        var cmd = this;
        var description = "";
        si.mem(function(data){
            var percent = parseFloat(((1 - (data.free / data.total)) * 100).toFixed(2));
            var memString = "RAM:\n     Total: " + RB(data.total, null, 2) + " | In use: " + RB(data.used, null, 2) + " | " + RB(data.used, null, 2) + "/" + RB(data.total, null, 2) + " | " +
                percent + "%\n\n";
            description += memString;
            si.cpu(function(dat){
                var cpuString = "CPU:\n     " + dat.manufacturer + " " + dat.brand + " " + dat.cores + "x Cores at " + dat.speed + "GHz \n";
                description += cpuString;
                si.currentLoad(function(da){
                    var cpuUsageString = "     Current Load: " + Math.round(da.currentload) + "% | System Load: " + Math.round(da.currentload_system) + "% | User Load: " + Math.round(da.currentload_user) + "%\n\n";
                    description += cpuUsageString;
                    var guilds = cmd.client.guilds.array();
                    var i = 0;
                    var members = 0;
                    for(i in guilds){
                        members += guilds[i].memberCount;
                    }
                    var discordString = "Discord:\n     Guilds: " + guilds.length + "\n     Users: " + members + "\n\n";
                    description += discordString;
                    var commandString = "Commands:\n    Number: " + bot.CommandManager.commands.length;
                    description += commandString;
                    var embed = cmd.embed(description);
                    message.channel.send({embed});
                });
            });
        });
    }

    toFixed(value, n) {
        const m = Math.pow(10, n);
        return Math.round((value * m)) / m;
    }

    getBytes(value){
        const bytes = Number(value);
        const absValue = Math.abs(bytes);
        const step = 1024;
        let i
        if (absValue === 0) i = 0
        else {
            i = Math.floor(Math.log2(absValue) / 10)
        }
        const j = Math.min(i, 8)
        const v = this.toFixed((absValue / Math.pow(step, j)), 2)
        return absValue === 0 ? 0 : v * (value/absValue);
    }
}

module.exports = sysinfo;
