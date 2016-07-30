var wlserverPath = '/home/user/labs/slackbot/javaArgs/'
  , argumentz = {
        jvm_args : [
            '-Xms1024m',
            '-Xmx1024m',
            '-Dsun.lang.ClassLoader.allowArraySyntax=true',
            {'-cp': wlserverPath+'NodeJavaTest.jar'}
        ],
        clazz : 'RunIt',
        jar_args : [
            {'-adminurl':'localhost:7001'},
            {'-username':'weblogic'},
            {'-password':'weblogic1'},
            '-listapps',
            {'-timeout':'600'},
            '-remote',
            '-verbose'
        ]
    }
  /*wlserverPath = '/opt/oracle/weblogic/wlserver_10.3/'
  , argumentz = {
        jvm_args : [
            '-Xms1024m',
            '-Xmx1024m',
            '-Dsun.lang.ClassLoader.allowArraySyntax=true',
            {'-cp': wlserverPath+'server/lib/weblogic.jar'}
        ],
        clazz : 'weblogic.Admin',
        jar_args : [
            {'-url':'localhost:7001'},
            {'-username':'weblogic'},
            {'-password':'weblogic1'},
            'GETSTATE'
        ]
    }*/
  , javaCall = require('../src/javaCall');

module.exports = function(skill, info, bot, message) {
    var response = ''
      , callback = function(error, stdout, stderr){
          if(error){
              console.log(error);
              response = 'I was unable to complete your request';
          } else {
              if(stdout){
                  response += stdout.toString('utf-8');
              } else {
	          response = 'Sorry buddy I didn\'t find your server');
              }
          }
          bot.reply(message, response);
        }
      , options = {
          encoding : 'buffer'
        }
      , serverName = '';
 
    bot.startConversation(message, function(err, convo) {
        convo.ask('What is the server you want to check the status of?', function(response, convo) {
            serverName = response.text.trim();
            if(serverName != ''){
	        bot.reply(message,'Right, I\'ll check the status of the server ' + serverName + ' for you.');
	        checkServerState();
	    }else{
	        bot.reply(message, 'I haven\'t recognised the server. Start again please');
	    }
	    convo.stop();
        });
    });
  
    var checkServerState = function(){
        argumentz.jar_args.push(serverName);
        javaCall(argumentz, callback, options);
};
