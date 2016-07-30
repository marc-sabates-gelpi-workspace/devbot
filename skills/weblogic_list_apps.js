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
        clazz : 'weblogic.Deployer',
        jar_args : [
            {'-adminurl':'localhost:7001'},
            {'-username':'weblogic'},
            {'-password':'weblogic1'},
            '-listapps',
            {'-timeout':'600'},
            '-remote',
            '-verbose'
        ]
    }*/
  , javaCall = require('../src/javaCall');

module.exports = function(skill, info, bot, message) {
    var response = ''
      , callback = function(error, stdout, stderr){
          if(error){
              console.log(error);
              response = 'I was unable to complete your request';
          } else if(stdout){
              response += stdout.toString('utf-8');
          }
          bot.reply(message, response);
        }
      , options = {
          encoding : 'buffer'
        };

    javaCall(argumentz, callback, options);
};
