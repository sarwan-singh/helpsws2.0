var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const schedule = require('node-schedule');
const request = require('request-promise');

mongoose.set('useFindAndModify', false);

const job = schedule.scheduleJob('0/60 * * * *',async function(){
  request.get('https://helpsws.herokuapp.com/createDataForNewDay').then(function(body){
    console.log("New User Data Added");
  })
  })
});

/*  GET home page. */
router.get('/', async function(req, res, next) {

  res.status(200);

  res.send("API Running!!!");

});

module.exports = router;
