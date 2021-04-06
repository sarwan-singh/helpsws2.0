var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

/*  GET home page. */
router.get('/', async function(req, res, next) {

  res.status(200);

  res.send("API Running!!!");

});

module.exports = router;
