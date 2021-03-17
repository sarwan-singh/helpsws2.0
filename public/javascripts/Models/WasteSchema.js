var mongoose=require('mongoose'); 
  
var WasteSchema = new mongoose.Schema({ 
    _id: Number, 
    totalCapacity: Number,
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
    bioPercentage: Number,
    emptyPercentage: Number,
    isFull: Boolean
},{_id: false}); 
  
module.exports = mongoose.model( 
    'Waste', WasteSchema,'wasteData'); 