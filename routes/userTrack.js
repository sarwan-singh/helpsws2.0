var express = require('express');
var router = express.Router();

var UserWasteSchema = require('../public/javascripts/Models/UserTrackSchema');
var UserTrackService = require('../public/javascripts/Services/UserTrackService');

/* Update user track(recycled/scanned) on the basis of email and type of 
    task */
router.post('/updateUserTrack', async function(req, res, next) {
    var email = req.body.email;

    var task = req.body.task;

    await UserTrackService.updateUserTrack(email, task, res);

});

/* Fetch user's track data on the basis of email and type of task */
router.post('/userTrack', async function(req, res, next){
    var email = req.body.email;

    await UserTrackService.getUserTrack(email, res);
})

module.exports = router;
