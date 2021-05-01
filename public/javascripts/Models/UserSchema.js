var mongoose=require('mongoose'); 
  
var UserSchema = new mongoose.Schema({ 
    name: String,
    email: String, 
    password: String, 
    verified: Boolean,
    started: Date
}); 
  
module.exports = mongoose.model( 
    'User', UserSchema ,'Users'); 