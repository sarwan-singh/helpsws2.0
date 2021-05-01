var nodemailer = require('nodemailer');

var UserSchema = require('../Models/UserSchema');
var UserWasteSchema = require('../Models/UserWasteSchema');
var Functions = require('../Functions');

var SecurityService = require('../Services/SecurityService');

async function getUser(email){
  var query = {
    email : email
  }

  var data = await UserSchema.find(query);
  
  return data;
}

function generateEmail(userName, email){
    return "<p>Hello " + userName + ",</p><p>Thanks for signing up with SWS! You must follow this link to activate your account:</p><a href='https://helpsws.herokuapp.com/verify/" + email + "'><p>Click here to verify your account</p></a>Have fun, and don't hesitate to contact us with your feedback.<h4>SWS Team</h4>"
}

function generateMailOptions(userName, email){
    var mailOptions = {
        from: 'helpsws2.0@gmail.com',
        to: email,
        subject: 'Confirm your account on SWS',
        html: generateEmail(userName, SecurityService.encrypt(email))
      };
      return mailOptions;
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'helpsws2.0@gmail.com',
      pass: 'Qwerty@123'
    }
  });

async function makeStartingUserData(email){
  var query = {
    email : email
  } 

  var existing = await UserWasteSchema.find(query);
  if(existing.length===0){
    
    var startingUserData = new UserWasteSchema({
      date: Functions.convertDate(0),
      email: email,
      totalWaste: 0,
      paperCount: 0,
      plasticCount: 0,
      glassCount: 0,
      metalCount: 0,
      bioCount: 0,
      paperPercentage: 0,
      plasticPercentage: 0,
      glassPercentage: 0,
      metalPercentage: 0,
      bioPercentage: 0,
      days: 1
    });

    await startingUserData.save();
  }
}

module.exports = {

    login : async function(email, password){

      var result = {status : "user login successful"}

      var data = await getUser(email);


      if(data.length==0){
        result.status = "wrong email or password";
        return result;
      }

      var dbPassword = SecurityService.decrypt(data[0].password);

      if(password!=dbPassword){
        result.status = "wrong email or password";
        return result;
      }

      if(data[0].verified==false){
        result.status = "user is not verified";
        return result;
      }

      return result

    },

    sendMail : async function(userName, email){

      transporter.sendMail(generateMailOptions(userName, email), function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

    },

    checkIfExists : async function(name, email, password){

      user = await getUser(email);

      password = SecurityService.encrypt(password); 

      if(user.length===1){
          var query = {
            email : email
          }

          user = user[0]

          if(user.verified==true){
            return false;
          }

          var update = {
            email : email,
            name : name, 
            password : password,
            verified : false,
            started: Functions.convertDate(0)
          }

          await UserSchema.findOneAndUpdate(query, update);
          
          return true;

      }else{
        this.createAccount(name, email, password);
        return true;
      }


    }, 

    createAccount : async function(name, email, password){

      password = SecurityService.encrypt(password);

      var newUser = new UserSchema({
        name: name,
        email: email, 
        password: password, 
        verified: false,
        started: Functions.convertDate(0)
      })

      await newUser.save();

    },

    isVerified : async function(email){
     
      var data = await getUser(email);

      return data[0].verified

    },

    verify : async function(email){
      email = SecurityService.decrypt(email);

      var query = {
        email : email
      }

      var user = await UserSchema.find(query);

      user = user[0];

      user.verified = true;

      user.started = Functions.convertDate(0);

      await makeStartingUserData(email);

      await UserSchema.findOneAndUpdate(query, user);
    },

    getUser : async function(email){
      
      var data = await getUser(email);

      data[0].password = SecurityService.decrypt(data[0].password)

      return data[0];

    }

}