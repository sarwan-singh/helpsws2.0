var express = require('express');
var router = express.Router();

var UserWasteSchema = require('../public/javascripts/Models/UserWasteSchema');
var UserDataService = require('../public/javascripts/Services/UserDataService');

/* GET users listing. */
router.get('/trial', async function(req, res, next) {
  res.send("WORKING PERFECTLY FINE!!!")
});



module.exports = router;
