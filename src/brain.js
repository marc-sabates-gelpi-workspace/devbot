
var NLP = require('natural');
var requireWatchingForChanges = require('./requireWatchingForChanges');

module.exports = Brain; 

function Brain() {
  this.classifier = new NLP.LogisticRegressionClassifier();
  this.minConfidence = 0.7;
}

Brain.prototype.teach = function(label, phrases) {
  phrases.forEach(function(phrase) {
    console.log('Ingesting example for ' + label + ': ' + phrase);
    this.classifier.addDocument(phrase.toLowerCase(), label);
  }.bind(this));
  return this;
};

Brain.prototype.think = function() {
  this.classifier.train();
  return this;
};

Brain.prototype.interpret = function(phrase) {
  var guesses = this.classifier.getClassifications(phrase.toLowerCase());
  var guess = guesses.reduce(toMaxValue);
  return {
    probabilities: guesses,
    guess: guess.value > this.minConfidence ? guess.label : null
  };
};

Brain.prototype.invoke = function(skill, info, bot, message) {
  var skillCode;
  console.log('Grabbing code for skill: ' + skill);
  try {
    //skillCode = require('../skills/' + skill);
    skillCode = requireWatchingForChanges('../skills/' + skill);
  } catch (err) {
    if(err instanceof SyntaxError) {
        logError(err);
        bot.reply(message, 'The skill `'+skill+'` needs to be debugged');
    } else {
        logError(err);
        console.log('The invoked skill doesn\'t exist: '+skill);
        bot.reply(message, 'The invoked skill doesn\'t exist: `'+skill+'`');
    }
    return this;
    //throw new Error('The invoked skill doesn\'t exist!');
  }
  console.log('Running skill code for ' + skill + '...');
  try{
      skillCode(skill, info, bot, message);
  } catch (err) {
      logError(err);
      bot.reply(message, 'I am sorry I couldn\'t finish doing the action `'+skill+'`');
  }
  return this;
};

function toMaxValue(x, y) {
  return x && x.value > y.value ? x : y;
}

var logError = function(err){
    console.log(err.stack);
};
