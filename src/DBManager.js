const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class DBManager
{

    constructor(url, db, client, bot){
        this.url = url;
        this.db = db;
        this.client = client;
        this.bot = bot;
    }

    findDocuments(search, collection, callback) {
        var d = this.db;
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(d);
            dbo.collection(collection).find(search).toArray(function(err, docs) {
                assert.equal(err, null);
                db.close();
                callback(docs);
            });
        });
    }

    getUser(userID, callback) {
        var user = {user: userID};
        this.findDocuments(user, "users", callback);
    }

    getMarriage(userID, guild, callback) {
        var user = {user: userID, guild: guild};
        this.findDocuments(user, "marriages", callback);
    }

    insertDocument(insert, callback) {
        var d = this.db;
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(d);
            dbo.collection("users").insertOne(insert, function(err, res) {
                if (err) throw err;
                callback(res);
                db.close();
            });
        });
    }

    createMarriage(user1, user2, callback) {
        var d = this.db;
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(d);
            var insert = [user1, user2];
            dbo.collection("marriages").insertMany(insert, function(err, res) {
                if (err) throw err;
                callback(res);
                db.close();
            });
        });
    }

    updateUserCurrencyData(userID, Xp, Money, rep, callback) {
        var d = this.db;
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(d);
            var user = {user: userID};
            var usr = { xp: Xp, money: Money, reputation: rep };
            var data = {$set:usr};
            dbo.collection("users").updateOne(user, data, function(err, res) {
                if (err) throw err;
                callback(res);
                db.close();
            });
        });
    }

    updateUserBG(userID, bgName, callback) {
        var d = this.db;
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(d);
            var user = {user: userID};
            var usr = { profileBackground: bgName };
            var data = {$set:usr};
            dbo.collection("users").updateOne(user, data, function(err, res) {
                if (err) throw err;
                callback(res);
                db.close();
            });
        });
    }

}

module.exports = DBManager;
