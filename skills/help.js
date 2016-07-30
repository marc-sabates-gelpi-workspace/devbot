
module.exports = function(skill, info, bot, message) {
    var response = 'Hi there, I\'m devsbot, and despite this being a hackathon, I can do a few things!'
        +' My creators are pretty awesome.\n'
        +'I can tell you the list of applications deployed in weblogic​ if you type *\'apps\'*.\n'
        +'I can tell you the list of jenkins jobs if you type *\'jenkins\'*.\n'
        +'I can tell you the status of a local server if you type *\'server status\'*\n'
        +'Under development:\n'
        +'\tType *\'deployments\'*';
    bot.reply(message, response);
};
