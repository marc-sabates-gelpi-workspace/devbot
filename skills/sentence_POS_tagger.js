var natural = require('natural')
  , Tagger = natural.BrillPOSTagger
  , tokenizer = new natural.WordTokenizer();

var base_folder = __dirname+'/../node_modules/natural/lib/natural/brill_pos_tagger';
var rules_file = base_folder + '/data/English/tr_from_posjs.txt';
var lexicon_file = base_folder + '/data/English/lexicon_from_posjs.json';
var default_category = 'N';
 
module.exports = function(skill, info, bot, message) {
    var tagger = new Tagger(lexicon_file, rules_file, default_category, function(error) {
        if (error) {
            console.log(error);
            bot.reply(message,'There has been a basic error, try it again please...');
        } else {
            var sentenceTokenised = []
              , sentence = extractSentence(message.text);
            
            if(sentence) {
                sentenceTokenised = tokenizer.tokenize(sentence);
                bot.reply(message, JSON.stringify(tagger.tag(sentenceTokenised)));
            }else{
                bot.reply(message, 'I am sorry, I couldn\'t understand the sentence. Write your sentence between a pair of *\'* or *"*.');
            }
        }
    });
};

var extractSentence = function(text){
    var attempt;

    attempt = text.match(/'(.*)'/);
    if(!oneGroup(attempt)) attempt = text.match(/"(.*)"/);
    if(!oneGroup(attempt)) attempt = text.match(/:(.*)/);
    if(!oneGroup(attempt)) return null;
    
    return attempt[1];
};

var oneGroup = function(arr){
    return (arr && arr.length > 1 && arr[1].length > 0);
};
