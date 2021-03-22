var mongoose = require('mongoose');
var WasteSchema = require('../Models/WasteSchema');
var WorkingBinSchema = require('../Models/WorkingBinSchema');


module.exports = {

    getQuery : function(id) {
        return {
            _id: id
        }   
    }
}