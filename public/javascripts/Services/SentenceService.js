var SentenceSchema = require('../Models/SentenceSchema');

module.exports = {

    addSentence : function(sentence, type, res){
        var quote = new SentenceSchema({
            type: type,
            sentence: sentence
        })

        if(type!=="quote"&&type!=="fact"){
            return res.send("Wrong type");
        }

        if(sentence.trim()===""){
            return res.send("Empty sentence");
        }

        quote.save();

        return res.send("Successfully added  " + type);
    },

    getSentences : function(type){

        var query = {
            type : type
        }

        return SentenceSchema.find(query);

    }


}