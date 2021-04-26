var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var SentenceService = require('../public/javascripts/Services/SentenceService');

mongoose.set('useFindAndModify', false);

/*  To add a fact or quote on the basis of its type*/
router.post('/addSentence', async function(req, res, next){
    var sentence = req.body.sentence;

    var type = req.body.type;

    SentenceService.addSentence(sentence, type, res);
    
})

/*  To fetch facts or quotes on the basis of type */
router.post('/getSentence', async function(req, res, next){
    var type = req.body.type;

    var sentence = await SentenceService.getSentences(type);

    res.send({sentences : sentence});
}) 

module.exports = router;