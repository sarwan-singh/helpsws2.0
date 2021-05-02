var mongoose=require('mongoose'); 
  
var UserTrackSchema = new mongoose.Schema({ 
    email: String,
    recycled: Number,
    scanned: Number
}); 
  
module.exports = mongoose.model( 
    'UserTrack', UserTrackSchema,'userTrack'); 