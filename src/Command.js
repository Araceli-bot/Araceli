const Message = require(__dirname + "/utils/Message");

class Command extends Message
{

    constructor(commandName, displayName, tags, usage, help, time = 0){
        super(commandName, displayName);
        this.commandName = commandName;
        this.displayName = displayName;
        this.usage = usage;
        this.help = help;
        this.cooldownTime = time;
        this.tags = tags;
    }

    execute(){
        return null;
    }

    log(message){
        var timestamp = require('time-stamp');
        console.log(timestamp('[HH:mm:ss]') + "[" + this.commandName + "]: " + message);
    }

}

module.exports = Command;
