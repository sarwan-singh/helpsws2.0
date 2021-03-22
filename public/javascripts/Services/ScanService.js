var mongoose = require('mongoose');
var WasteSchema = require('../Models/WasteSchema');
var WorkingBinSchema = require('../Models/WorkingBinSchema');

module.exports = {

    getQuery : function(id) {
        return {
            _id: id
        }   
    },

    detectChange : async function(id, res){

        var something = WorkingBinSchema.watch();

        something.on('change',async change =>{
          if(change.documentKey._id==id){
            return res.send(change.fullDocument);
          }else{
            await this.detectChange(id, res);
          }
        })
    }


}