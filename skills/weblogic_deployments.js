var requireWatchingForChanges = require('../src/requireWatchingForChanges');
var cachedResponseAndDoubleCheck = requireWatchingForChanges('../src/cachedResponseAndDoubleCheck');

module.exports = function(skill, info, bot, message) {
    cachedResponseAndDoubleCheck.action(skill, bot, message, callback);
};

var callback = function(){
    var reply_with_attachments = {
        'text': 'This is a pre-text',
        'attachments': [
            {
                'fallback': 'To be useful, I need you to invite me in a channel.',
                'title': 'How can I help you?',
                'text': 'To be useful, I need you to invite me in a channel ',
                'color': '#7CD197'
            }
        ],
        'icon_url': 'http://lorempixel.com/48/48'
    };

    return reply_with_attachments;;
    //'```'
    // + 'Web\tScrewfix-3.180.19799\tSHUTDOWN'
    // + '\nAdmin Console\t\tSHUTDOWN'
    // + '\nBCC\tFixesVer-3.179.19634\tRUNNING'
    // + '```';
};
