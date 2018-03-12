class CooldownQueue {

    constructor(){
        this.queue = [];
        this.start();
    }

    addToQueue(user, command, time){
        var object = {user: user.id, commandName: command, time: time};
        this.queue.push(object);
    }

    inQueue(user, command){
        const result = this.queue.filter(obj => obj.user === user.id && obj.commandName === command);
        if(result.length > 0){
            return true;
        } else {
            return false;
        }
    }

    getTimeLeft(user, command){
        const result = this.queue.filter(obj => obj.user === user.id && obj.commandName === command);
        if(result.length > 0){
            return result[0].time;
        } else {
            return false;
        }
    }

    start() {
        var mngr = this;
        setInterval(function(){
            for(var i = 0; i < mngr.queue.length; i++){
                var elem = mngr.queue[i];
                if(elem.time > 0){
                    elem.time --;
                } else {
                    mngr.queue.splice(i, 1);
                }
            }
        }, 1000);
    }

}

module.exports = CooldownQueue;
