var WasteSchema = require('../Models/WasteSchema');
var mongoose = require('mongoose');

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

module.exports = {

    checkIfFull : function(waste){
        return waste.isFull;
    },

    
    addGarbage : async function(waste, garbageType){
       
        var query = {
            _id : waste._id
        };

        var tempMultiplier = 100/waste.totalCapacity;

        var emptyPercentage = waste.totalCapacity - waste.filledCapacity - 1;
        
        var convertedPercentages = {
            plasticPercentage : roundToTwo((waste.plasticCount)*tempMultiplier),
            paperPercentage : roundToTwo((waste.paperCount)*tempMultiplier.roundToTwo()),
            glassPercentage : roundToTwo((waste.glassCount)*tempMultiplier.roundToTwo()),
            metalPercentage : roundToTwo((waste.metalCount)*tempMultiplier.roundToTwo()),
            bioPercentage : roundToTwo((waste.bioCount)*tempMultiplier.roundToTwo()),
            emptyPercentage : roundToTwo((emptyPercentage)*tempMultiplier.roundToTwo())
        }
        
        var percentages = {
            plasticPercentage : roundToTwo((waste.plasticCount+1)*tempMultiplier.roundToTwo()),
            paperPercentage : roundToTwo((waste.paperCount+1)*tempMultiplier.roundToTwo()),
            glassPercentage : roundToTwo((waste.glassCount+1)*tempMultiplier.roundToTwo()),
            metalPercentage : roundToTwo((waste.metalCount+1)*tempMultiplier.roundToTwo()),
            bioPercentage : roundToTwo((waste.bioCount+1)*tempMultiplier.roundToTwo()),
        }

        var update = {
            isFull: false,
            plasticPercentage : convertedPercentages.plasticPercentage,
            paperPercentage : convertedPercentages.paperPercentage,
            glassPercentage : convertedPercentages.glassPercentage,
            metalPercentage : convertedPercentages.metalPercentage,
            bioPercentage : convertedPercentages.bioPercentage,
            emptyPercentage : convertedPercentages.emptyPercentage,
            $inc: { filledCapacity: 1,
                    plasticCount : 0 ,
                    paperCount : 0,
                    metalCount: 0,
                    bioCount: 0,
                    glassCount: 0 }
        };

        if(waste.filledCapacity==waste.totalCapacity - 1){
            update = {
                isFull: true
            }
        }

        switch(garbageType){
            case "plastic" :    update.plasticPercentage = percentages.plasticPercentage;
                                update.$inc.plasticCount = 1;
                                break;
            case "paper" :      update.paperPercentage = percentages.paperPercentage;
                                update.$inc.paperCount = 1;
                                break;
            case "glass" :      update.glassPercentage = percentages.glassPercentage;
                                update.$inc.glassCount = 1;
                                break;
            case "metal" :      update.metalPercentage = percentages.metalPercentage;
                                update.$inc.metalCount = 1;
                                break;
            case "bio" :        update.bioPercentage = percentages.bioPercentage;
                                update.$inc.bioCount = 1;
                                break;
        }

        var result;

        await WasteSchema.findOneAndUpdate(query, update, {new : true});

    }

}

