var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var LoginService = require('../public/javascripts/Services/LoginService');

mongoose.set('useFindAndModify', false);

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