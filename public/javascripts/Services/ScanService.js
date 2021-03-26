var mongoose = require('mongoose');
var WasteSchema = require('../Models/WasteSchema');
var WorkingBinSchema = require('../Models/WorkingBinSchema');

function returnError(res){
  
}

module.exports = {

    getData : async function(id){
        var query = {_id : id};
        var wasteStatus = await WorkingBinSchema.find(query);
        wasteStatus = wasteStatus[0];
        return wasteStatus; 
    },

    detectChange : async function(id, res){

        var something = WorkingBinSchema.watch();

        something.on('change',async change =>{
          if(change.documentKey._id==id){
            something.removeAllListeners();
            return res.send({retry: false, data: change.fullDocument});
          }else{
            await this.detectChange(id, res);
          }
        })


    },

    changeData : async function(id, wasteStatus){

        var query = {_id : id};

        var update = {
            isWorking : !wasteStatus.isWorking
        }

        return await WorkingBinSchema.findOneAndUpdate(query, update, {new : true});

    }


}