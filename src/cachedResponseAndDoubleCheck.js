var bluebird = require("bluebird");

var redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const keyPrefix = 'bottie_';

var client;

exports.action = function(skill, bot, message, callback){
    initialiseRedisClient();
    var simpleBot = getSimpleBot(bot, message);
    quickCacheCheck(skill, simpleBot);
    doubleCheckSkillAction(skill, simpleBot, callback);
};

var getSimpleBot = function(bot, message){
    return({
        bot: bot,
        reply: function(response){
            bot.reply(message, response);
        }
    });
};

var memoize = function(func){
    var cache = {};
    var slice = Array.prototype.slice;

    return function() {
        var args = slice.call(arguments);

        for(var i in args){
            if(typeof args[i] == 'object') args[i] = JSON.stringify(args[i]);
        }

        if (!cache.hasOwnProperty(args))
            cache[args] = func.apply(this, args);
        
        return cache[args];
    }
}; 

var quickCacheCheck = function(skill, simpleBot){
    var key = keyPrefix + string2hex(skill);
    if(client.connected){
        getRedisKey(key, function (response) {
            simpleBot.reply('The cached response is: ');
            simpleBot.reply(response);
        });
    }
};

var doubleCheckSkillAction = function(skill, simpleBot, callback){
    var args = {};
    var result = callback.apply(this, args);
    var key = keyPrefix + string2hex(skill);
    if(client.connected){
        getRedisKey(key, function(cachedResult){
            if(stringify(result) != stringify(cachedResult)){
                client.set(key, JSON.stringify(result));
                simpleBot.reply('These are the most updated values: ');
                simpleBot.reply(result);
            }
        });
    }else{
        simpleBot.reply(result);
    }
};

var stringify = function(obj){
    var tempObject = obj;
    if(typeof obj != 'string') tempObject = JSON.stringify(obj);
  
    return Buffer.from(tempObject,'ascii').toString('hex');
};

var string2hex = memoize(function(text){
    return (Buffer.from(text,'ascii')).toString('hex');
});

var gracefullyClosing = function() {
    console.log(
        '\nGracefully shutting down.'
            + ' Closing redis connection');
    client.quit();
    console.log("Exiting...");
    process.exit();
};

process.on('SIGINT', gracefullyClosing);
process.on('SIGTERM', gracefullyClosing);

var getRedisKey = function(key, callback){
//    console.log('Redis key: %s', key);
    client.getAsync(key).then(callback);
};

var initialiseRedisClient = function(){
    if(!client || !client.connected){
        if(client) client.quit();
        client = redis.createClient();
        client.on('error', function (err) {
            console.log(err);
        });
    }
};
