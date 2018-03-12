class ActivityManager {

    constructor(){
        this.last = -1;
        this.activities = [
            {
                type: 3,
                msg: "%g guilds"
            },
            {
                type: 2,
                msg: "%g guilds"
            },
            {
                type: 1,
                msg: "type >help"
            },
            {
                type: 3,
                msg: "%m users"
            },
        ]
    }

    getActivity(){
        if(this.last == (this.activities.length - 1)){
            this.last = -1;
        }
        var index = this.last + 1;
        this.last += 1;
        return this.activities[index];
    }

}

module.exports = ActivityManager;
