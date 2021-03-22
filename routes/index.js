var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const schedule = require('node-schedule');
const request = require('request-promise').defaults({jar:true});
var EventEmitter = require('events');
var Event = new EventEmitter();

var GetGarbageService = require('../public/javascripts/Services/GetGarbageService');
var AddGarbageService = require('../public/javascripts/Services/AddGarbageService');
var ScanService = require('../public/javascripts/Services/ScanService');

mongoose.set('useFindAndModify', false);

const WasteSchema = require('../public/javascripts/Models/WasteSchema')
const WorkingBinSchema = require("../public/javascripts/Models/WorkingBinSchema");

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

/* To fetch a Garbage with provided id. If it doesn't exist
    make a new one. */
router.post('/id', async function(req, res, next){

  var id = req.body.id;

  var garbage = await GetGarbageService.checkIfExists(id);

  res.send(garbage);

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


/* To listen on if any garbage is scanned or session is ended with 
    the provided id*/
router.post('/scan', async function(req, res, next){

  var id = req.body.id;

  await ScanService.detectChange(id, res);

})

/* To change status of scan from frontend app so that it could be detected
    on machine*/
router.post('/scanned', async function(req, res, next){

  var id = req.body.id;

  var wasteStatus = await ScanService.getData(id);

  var data = await ScanService.changeData(id, wasteStatus);

  res.send(data);

})


module.exports = router;
