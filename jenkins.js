 //https://github.com/jansepar/node-jenkins-api
var jenkinsapi = require('jenkins-api');

var jenkins = jenkinsapi.init("http://vuxdev2065.ondc.screwfix.local:8090");
var jobName = 'INT_CpcOrder_TcRefund_NwWebOrderHistoryCheckMddw';

jenkins.job_info(jobName, function(err, data) {
  if (err){ return console.log(err); }
  console.log('======== job info ========');
  console.log(data)
});

jenkins.last_success(jobName, function(err, data) {
  if (err){ return console.log(err); }
  console.log('======== last sucsess ========');
  console.log(data)
});

jenkins.build_info(jobName, '6', function(err, data) {
  if (err){ return console.log(err); }
  console.log('======== build info ========');
  console.log(data)
});

jenkins.job_output(jobName, '6', function(err, data) {
  if (err){ return console.log(err); }
  console.log('======== output ========');
  console.log(data)
});
 
var spawn = require('child_process').spawn;

//java -Xms1024m -Xmx1024m -Dsun.lang.ClassLoader.allowArraySyntax=true -cp C:/Oracle/Middleware/wlserver_10.3/server/lib/weblogic.jar weblogic.Deployer -adminurl vuxdev2066.ondc.screwfix.local:7001 -username weblogic -password weblogic1 -listapps -timeout 600 -remote -verbose
var child = spawn('java', ['-Xms1024m', '-Xmx1024m', '-Dsun.lang.ClassLoader.allowArraySyntax=true', '-cp', 'C:/Oracle/Middleware/wlserver_10.3/server/lib/weblogic.jar', 'weblogic.Deployer', '-adminurl', 'localhost:7001', '-username', 'weblogic', '-password', 'weblogic1', '-listapps', '-timeout', '600', '-remote', '-verbose'], {
  detached: false
});

 child.stdout.on('data', function(data) {
    console.log('======== weblogic.Deployer ========');
    console.log(data.toString('utf-8'));
});

child.stderr.on('data', function(data) {
  console.log('Error: '+data.toString('utf-8'));
});

child.on('exit', function(code) {
  console.log('Child exited with code ${code}');
});

child.unref(); 