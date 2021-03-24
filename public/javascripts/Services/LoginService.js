var nodemailer = require('nodemailer');

var UserSchema = require('../Models/UserSchema');


function generateEmail(userName, email){
    return "<p>Hello " + userName + ",</p><p>Thanks for signing up with SWS! You must follow this link to activate your account:</p><a href='https://helpsws.herokuapp.com/verify/" + email + "'><p>Click here to verify your account</p></a>Have fun, and don't hesitate to contact us with your feedback.<h4>SWS Team</h4>"
}

function generateMailOptions(userName, email){
    var mailOptions = {
        from: 'helpsws2.0@gmail.com',
        to: email,
        subject: 'Confirm your account on SWS',
        html: generateEmail(userName, email)
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

module.exports = {

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

      var query = {
          email : email
      }
      var user = await UserSchema.find(query); 

      if(user.length===1){
          user = user[0]
          if(user.verified==true){
            return false;
          }

          var update = {
            email : email,
            name : name, 
            password : password,
            verified : false
          }

          await UserSchema.findOneAndUpdate(query, update, {new : true});

          return true;

      }else{
        this.createAccount(name, email, password);
        return true;
      }


    }, 

    createAccount : async function(name, email, password){

      var newUser = new UserSchema({
        name: name,
        email: email, 
        password: password, 
        verified: false
      })

      newUser.save();

    },


}