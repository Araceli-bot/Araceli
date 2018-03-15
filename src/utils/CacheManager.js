class CacheManager {

    constructor(){
        this.cache = {
            users: {
                1: {
                    username: "Hitt"
                }
            },
            marriages: {

            },
            guilds: {

            }
        };
    }

    setDb(db){
        this.db = db;
    }

    //Example get string: users.1020303.username
    get(queryString){
        return this.queryToObj(queryString);
    }

    set(queryString, object){

    }

    save(){

    }

    update(queryString, updatedObject){

    }

    queryToObj(queryString){
        var queryArray = queryString.split(".");
        if(this.exists(queryArray)){
            return this.getObjRecursive(queryString.split("."), this.cache);
        } else {
            throw new ReferenceError("Requested query '" + queryString + "' does not exist.");
        }
    }

    getObjRecursive(path, obj){
        if(path.length > 0){
            var object = obj[path[0]]
            path.shift();
            return this.getObjRecursive(path, object);
        } else {
            return obj;
        }
    }

    exists(path){
        if(this.objRecursiveExists(path) !== false){
            return true;
        } else {
            return false;
        }
    }

    objRecursiveExists(path){
        if(path.length > 0){
            console.log(path)
            if(this.isSet(this.cache[path[0]])){
                path.shift();
                return this.objRecursiveExists(path);
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    isSet(value){
        var ret;
        console.log(value)
        console.log(typeof value)
        if(typeof value !== 'undefined'){
            ret = true;
        } else {
            ret = false;
        }
        return ret;
    }

}

module.exports = CacheManager;
