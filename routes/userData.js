var express = require('express');
var router = express.Router();

var UserWasteSchema = require('../public/javascripts/Models/UserWasteSchema');
var UserDataService = require('../public/javascripts/Services/UserDataService');

/* Update user data on the basis of start and end data of 
    bin with email of user */
router.post('/updateUserData', async function(req, res, next) {
    var start = req.body.start;

    var end = req.body.end;

    var email = req.body.email;

    await UserDataService.updateData(email, start, end, res);

});

/* Fetch user data on the basis of email of user. */
router.post('/userData', async function(req, res, next){
    var email = req.body.email;

    var days = req.body.days;

    console.log(days);

    if(days===undefined){
        days = -1;
    }

    await UserDataService.getUserData(email, res, days);
})

router.get('/createDataForNewDay', async function(req, res, next){
    await UserDataService.newDayData(res);
})

module.exports = router;
