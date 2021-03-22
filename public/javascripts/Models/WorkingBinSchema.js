var mongoose=require('mongoose'); 
  
var WorkingBinSchema = new mongoose.Schema({ 
    _id: Number, 
    isWorking: Boolean
},{_id: false}); 
  
module.exports = mongoose.model( 
    'WorkingBin', WorkingBinSchema ,'WorkingBins'); 