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

        var tempMultiplier = 100/waste.totalCapacity;

        var emptyPercentage = waste.totalCapacity - waste.filledCapacity - 1;

        var percentages = {
            plasticPercentage : (waste.plasticCount+1)*tempMultiplier,
            paperPercentage : (waste.paperCount+1)*tempMultiplier,
            glassPercentage : (waste.glassCount+1)*tempMultiplier,
            metalPercentage : (waste.metalCount+1)*tempMultiplier,
            bioPercentage : (waste.bioCount+1)*tempMultiplier,
            emptyPercentage : (emptyPercentage)*tempMultiplier
        }

        switch(garbageType){
            case "plastic" :  update = {
                                    isFull: update.isFull,
                                    plasticPercentage : percentages.plasticPercentage,
                                    emptyPercentage : percentages.emptyPercentage,
                                    $inc: { filledCapacity: 1, plasticCount : 1 }
                                };
                                break;
            case "paper" :  update = {
                                    isFull: update.isFull,
                                    paperPercentage : percentages.paperPercentage,
                                    emptyPercentage : percentages.emptyPercentage,
                                    $inc: { filledCapacity: 1, paperCount : 1 }
                                };
                                break;
            case "glass" :  update = {
                                    isFull: update.isFull,
                                    glassPercentage : percentages.glassPercentage,
                                    emptyPercentage : percentages.emptyPercentage,
                                    $inc: { filledCapacity: 1, glassCount : 1 }
                                };
                                break; 
            case "metal" :  update = {
                                    isFull: update.isFull,
                                    metalPercentage : percentages.metalPercentage,
                                    emptyPercentage : percentages.emptyPercentage,
                                    $inc: { filledCapacity: 1, metalCount : 1 }
                                };
                                break;
            case "bio" :  update = {
                                    isFull: update.isFull,
                                    bioPercentage : percentages.bioPercentage,
                                    emptyPercentage : percentages.emptyPercentage,
                                    $inc: { filledCapacity: 1, bioCount : 1 }
                                };
                                break;
        }

        var result;

        await WasteSchema.findOneAndUpdate(query, update, {new : true});

    }

}

