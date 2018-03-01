class Command
{

    constructor(commandName, args, usage, help){
        this.commandName = commandName;
        this.usage = usage;
        this.help = help;
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
