var WasteSchema = require('../Models/WasteSchema');
var mongoose = require('mongoose');

module.exports = {

    checkIfFull : function(waste){
        return waste.isFull;
    },

    addGarbage : async function(waste, garbageType){
       
        var query = {
            _id : waste._id
        };

        var update = {
            isFull: false
        };

        if(waste.filledCapacity==waste.totalCapacity - 1){
            update = {
                isFull: true
            }
        }

        switch(garbageType){
            case "plastic" :  update = {
                                    isFull: update.isFull,
                                    $inc: { filledCapacity: 1, plasticCount : 1 }
                                    
                                };
                                break;
            case "papper" :  update = {
                                    isFull: update.isFull,
                                    $inc: { filledCapacity: 1, paperCount : 1 }
                                    
                                };
                                break;
            case "glass" :  update = {
                                    isFull: update.isFull,
                                    $inc: { filledCapacity: 1, glassCount : 1 }
                                    
                                };
                                break; 
            case "metal" :  update = {
                                    isFull: update.isFull,
                                    $inc: { filledCapacity: 1, metalCount : 1 }
                                    
                                };
                                break;
            case "bio" :  update = {
                                    isFull: update.isFull,
                                    $inc: { filledCapacity: 1, bioCount : 1 }
                                    
                                };
                                break;
        }

        var result;

        await WasteSchema.findOneAndUpdate(query, update, {new : true});

    }

}

