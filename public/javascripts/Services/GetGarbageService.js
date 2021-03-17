var mongoose = require('mongoose');
var WasteSchema = require('../Models/WasteSchema');

module.exports = {

    checkIfExists : async function(id){
        id = parseInt(id);
        var query = {
            _id : id
        }
        var waste = await WasteSchema.find(query); 

        if(waste.length===0){
            waste = this.makeNewGarbage(id);
            waste = [waste]
        }

        return waste[0];
    }, 

    makeNewGarbage : async function(id){
        var newWaste = new WasteSchema({
            _id: id,
            totalCapacity: 50,
            filledCapacity: 0,
            paperCount: 0,
            plasticCount: 0,
            glassCount: 0,
            metalCount: 0,
            bioCount: 0,
            paperPercentage: 0,
            plasticPercentage: 0,
            glassPercentage: 0,
            metalPercentage: 0,
            bioPercentage: 0,
            emptyPercentage: 0,
            isFull: false
        });

        await newWaste.save();

        return newWaste;
    }

}

