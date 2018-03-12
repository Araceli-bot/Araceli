class Cooldown {

    constructor(time, user, command){
        this.time = time;
        this.user = user;
        this.command = command;

        this.startCooldown();
    }

    startCooldown(){
        setTimeout(function(){
            delete(this);
        }, this.time * 1000);
    }

}
