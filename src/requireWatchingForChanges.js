var fs = require('fs');

module.exports = function (moduleName){
    var moduleFullPath = require.resolve(moduleName);
    //fs.watch() is not 100% supported on all platforms, if trouble
    //use fs.watchFile()
    //XXX This implementation can lead to faulty multiple watchers if
    //it's evaluated between delete require.cache[] and require() on
    //the reload functions
    if(require.cache[moduleFullPath] === undefined){
        fs.watch(moduleFullPath, {persistent:false}, watchCallback(moduleFullPath));
    }
    return require(moduleFullPath);
};

var watchCallback = function(fullPath, goodOlTimerTrick){
    return(function(event, filename){
        if(goodOlTimerTrick === undefined){
            goodOlTimerTrick = setTimeout(function(){
                //logDebug(fullPath);
                console.log('[Watch callback] %s event: %s filename: %s',new Date(), event, filename);
                reload(fullPath);
                goodOlTimerTrick = undefined;
            }, 850);
        }
    });
};

var reload = function(module){
    if(require.cache[module] !== undefined){
        delete require.cache[module];
        require(module);
    }
};

var logDebug = function(module){
    console.log('[logDebug]');
    if(require.cache[module] !== undefined){
        logDebugRecursive(require.cache[module]);
    }
};

var logDebugRecursive = function(module){
    if(module){
        logDebugRecursive(module.parent);
        console.log('[Require hierarchy] %s',module.filename);
    }
};
