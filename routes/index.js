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
var LoginService = require('../public/javascripts/Services/LoginService');

mongoose.set('useFindAndModify', false);

const WasteSchema = require('../public/javascripts/Models/WasteSchema')
const WorkingBinSchema = require("../public/javascripts/Models/WorkingBinSchema");

var Functions = require('../public/javascripts/Functions');

/*  GET home page. */
router.get('/', async function(req, res, next) {

  res.status(200);

  res.send("API Running!!!");

});

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


/*  To listen on if any garbage is scanned or session is ended with 
    the provided id*/
router.post('/scan', async function(req, res, next){

  var id = req.body.id; 

  req.socket.setTimeout(2147483647)

  res.status = 200;

  await ScanService.detectChange(id, res);

})

/*  To change status of scan from frontend app so that it could be detected
    on machine*/
router.post('/scanned', async function(req, res, next){

  var id = req.body.id;

  var wasteStatus = await ScanService.getData(id);

  var data = await ScanService.changeData(id, wasteStatus);

  res.send(data);

})

/*  To create a new user with provided details in database or update
    if already exists with unverified email*/
router.post('/addAccount', async function(req, res, next){
  var email = req.body.email;
  
  var name = req.body.name;

  var password = req.body.password;

  var status = await LoginService.checkIfExists(name, email, password);

  res.send({accountCreated : status});  
})

/*  To send a verification mail to the user's E-mail to complete
    user sign up*/
router.post('/sendMail', async function(req, res, next){
  var email = req.body.email;

  var name = req.body.name;

  LoginService.sendMail(name, email);

  res.send("Email sent...");
})

/*  To verify a user with provided encrypted email.*/
router.get('/verify/:email', async function(req, res, next){
  var email = req.params.email;

  await LoginService.verify(email);

  res.send("<p>Your account has been verified. Click refresh on app to continue</p>");
})

/*  To check if a user is verified or not with provided email */
router.post('/isverified', async function(req, res, next){
  var email = req.body.email;

  var status = await LoginService.isVerified(email);

  res.send({status : status});
})

/*  To fetch any user's detail with provided email */
router.post('/getuser', async function(req, res, next){
  var email = req.body.email;

  var data = await LoginService.getUser(email);

  data.password = "";

  res.send(data);
})

/*  To login user with provided email and password */
router.post('/login', async function(req, res, next){
  var email = req.body.email;

  var password = req.body.password;

  var data = await LoginService.login(email, password);

  res.send(data);
})

module.exports = router;
