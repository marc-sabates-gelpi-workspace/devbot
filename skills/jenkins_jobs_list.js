
module.exports = function(skill, info, bot, message) {
  var jenkinsapi = require('jenkins-api');
	var response = '```';
  
  var jenkins = jenkinsapi.init("http://vuxdev2065.ondc.screwfix.local:8090");

	jenkins.all_jobs(function(err, data) {
	  if (err){ return console.log(err); }
	  for (key in data){
		response += data[key].name+"\n";
	 }
	  console.log(data)
	  
	 response += '```';
	  bot.reply(message, response);
	});

	
};
