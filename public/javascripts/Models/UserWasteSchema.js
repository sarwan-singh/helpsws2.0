var mongoose=require('mongoose'); 
  
var UserWasteSchema = new mongoose.Schema({ 
    email: String,
    date: Date,
    totalWaste: Number,
    paperCount: Number,
    plasticCount: Number,
    glassCount: Number,
    metalCount: Number,
    bioCount: Number,
    paperPercentage: Number,
    plasticPercentage: Number,
    glassPercentage: Number,
    metalPercentage: Number,
    bioPercentage: Number,
    day: Number
}); 
  
module.exports = mongoose.model( 
    'UserWaste', UserWasteSchema,'userWasteData'); 