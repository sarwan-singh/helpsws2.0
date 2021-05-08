var Functions = require('../Functions')
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

const db = Functions.getUrl();
mongoose.Promise = global.Promise;

mongoose.connect(db, Functions.getConnectionParams(), function(error){
    if(error){
        console.log("Error!" + error);
    }
})
 
module.exports = router;
