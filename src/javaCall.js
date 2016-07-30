var execFile = require('child_process').execFile;

var keepStringAndArraifyObject = function(elem){
    var result = [];
    
    if(typeof elem === 'string'){
        return elem;
    }else if(typeof elem === 'object'){
        for(var key in elem){
            result.push(key);
            result.push(elem[key]);
        }
        return result;
    }
};

var concatSubArrays = function(arr){
    arrResult = [];
    
    for(var index in arr){
        arrResult = arrResult.concat(keepStringAndArraifyObject(arr[index]));
    }
    return arrResult;
};

var createJavaCallArguments = function(args){
    var javaCallArgs = [];
    javaCallArgs = javaCallArgs.concat(concatSubArrays(args.jvm_args));
    javaCallArgs = javaCallArgs.concat(args.clazz);
    javaCallArgs = javaCallArgs.concat(concatSubArrays(args.jar_args));

    return javaCallArgs;
};

module.exports = function(argumentz, callback, options){
    var javaCallArguments = createJavaCallArguments(argumentz);
    options = options || {};
    if(!options.maxBuffer) options.maxBuffer = 500*1024;
    if(!options.encoding) options.encoding = 'buffer';

    var child = execFile(
        'java',
        javaCallArguments, 
        options,
        callback
    );
};
