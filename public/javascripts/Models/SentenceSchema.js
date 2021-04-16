var mongoose=require('mongoose'); 
  
var SentenceSchema = new mongoose.Schema({ 
    type: String,
    sentence: String
}); 
  
module.exports = mongoose.model( 
    'Sentence', SentenceSchema ,'Sentences'); 