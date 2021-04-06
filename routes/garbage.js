var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var GetGarbageService = require('../public/javascripts/Services/GetGarbageService');
var AddGarbageService = require('../public/javascripts/Services/AddGarbageService');

mongoose.set('useFindAndModify', false);

/*  To fetch a Garbage with provided id. If it doesn't exist
    make a new one. */
router.post('/id', async function(req, res, next){

  var id = req.body.id;

  var garbage = await GetGarbageService.checkIfExists(id);

  res.send(garbage);

});

/*  To add a new garbage type in garbage with provided id and
    garbage type. */
router.post('/addGarbage', async function(req, res, next){

  var id = req.body.id;

  var type = req.body.type;

  var garbage = await GetGarbageService.checkIfExists(id);

  if(AddGarbageService.checkIfFull(garbage)){
    res.send(garbage);
  }else{
    await AddGarbageService.addGarbage(garbage, type);
    res.send(await GetGarbageService.checkIfExists(id));
  }
})

module.exports = router;