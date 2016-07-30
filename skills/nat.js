var natural = require('natural'),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf();
 
/*tfidf.addDocument('this document is about node.');
tfidf.addDocument('this document is about ruby.');
tfidf.addDocument('this document is about ruby and node.');
tfidf.addDocument('this document is about node. it has node examples');
 
console.log('node --------------------------------');
tfidf.tfidfs('node', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});
 
console.log('ruby --------------------------------');
tfidf.tfidfs('ruby', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});*/

var sentence = ''
  , environments = ['ci','local','ae1','ae2','ae3','ae4','ae5','ae6','ae7','ae8','ae9','jt']
  , apps = ['web','tc','cca','bcc','fulfiller']
  , stdin = process.openStdin();

console.log('What can I do for you?');
stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    sentence = d.toString();
    console.log('-------- %s --------', sentence.replace(/[\n\r]/,''));
    tfidf = new TfIdf();
    tfidf.addDocument(sentence);
  
    var maxEnv=-999
      , selectedEnv = '';
    for(var index in environments){
        tfidf.tfidfs(environments[index], function(i, measure){
            if(measure>maxEnv && measure>0){
                maxEnv = measure;
                selectedEnv = environments[index];
            }
        });
    }


    var maxApp=-999
      , selectedApp = '';
    for(var index in apps){
        tfidf.tfidfs(apps[index], function(i, measure){
            if(measure>maxApp && measure>0){
                maxApp = measure;
                selectedApp = apps[index];
            }
        });
    }

    var result;
    if(selectedEnv)
        result = 'I guess you were talking about ' + selectedEnv + ' (prob ' + maxEnv +')';
    else
        result = 'I couldn\'t guess the environment';

    if(selectedApp)
        result += ' and I guess you were talking about ' + selectedApp + ' (prob ' + maxApp +')';
    else
        result += ' and I couldn\'t guess the app';

    console.log(result);
    console.log('What can I do for you?');
});
