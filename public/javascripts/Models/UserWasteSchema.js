var mongoose=require('mongoose'); 
  
var UserWasteSchema = new mongoose.Schema({ 
    date: Date, 
    email: String,
    filledCapacity: Number,
    paperCount: Number,
    plasticCount: Number,
    glassCount: Number,
    metalCount: Number,
    bioCount: Number,
    paperPercentage: Number,
    plasticPercentage: Number,
    glassPercentage: Number,
    metalPercentage: Number,
    bioPercentage: Number
}); 
  
module.exports = mongoose.model( 
    'UserWaste', UserWasteSchema,'userWasteData'); 