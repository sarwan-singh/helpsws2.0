var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ScanService = require('../public/javascripts/Services/ScanService');

mongoose.set('useFindAndModify', false);

/*  To listen on if any garbage is scanned or session is ended with 
    the provided id*/
router.post('/scan', async function(req, res, next){

  var id = req.body.id; 

  req.setTimeout(500000);

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

module.exports = router;