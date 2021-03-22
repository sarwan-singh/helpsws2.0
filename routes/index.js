var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const schedule = require('node-schedule');
const request = require('request-promise').defaults({jar:true});
var EventEmitter = require('events');
var Event = new EventEmitter();

var GetGarbageService = require('../public/javascripts/Services/GetGarbageService');
var AddGarbageService = require('../public/javascripts/Services/AddGarbageService');

mongoose.set('useFindAndModify', false);

const WasteSchema = require('../public/javascripts/Models/WasteSchema')

var Functions = require('../public/javascripts/Functions');


/* To make API run 24/7. */

const job = schedule.scheduleJob('0/20 * * * *',async function(){
  request.get('https://helpsws.herokuapp.com/').then(function(body){
    console.log("API TRIGGERED");
  })
});

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.status(200);

  res.send("API Running!!!");

});

router.get('/testing', async function(req, res, next){
  
  Event.on('ScannedQR', function(){
    res.send("Just testing stuff, Did it came after 5 secs?");
  })

  setTimeout(function(){
    Event.emit('ScannedQR');
  }, 5000)

})

/* To fetch a Garbage with provided id. If it doesn't exist
    make a new one. */
router.post('/id', async function(req, res, next){

  var id = req.body.id;

  var garbage = await GetGarbageService.checkIfExists(id);

  res.send(garbage);

});

router.get('/:id', async function(req, res, next){

  var idValue = req.params.id;

  res.redirect("smartwastesegregator.netlify.app")

});

/* To add a new garbage type in garbage with provided id and
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
