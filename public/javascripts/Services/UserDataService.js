var UserWasteSchema = require('../Models/UserWasteSchema');
var ScanService = require('./ScanService');

function getCurrentDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

module.exports = {

    updateData : async function(email, start, end, res){
        var query = {
            email : email
        }

        if(email.trim()===""){
            return res.send("please provide email");
        }

        var userData = await UserWasteSchema.find(query);

        if(userData.length===0){
            return res.send("wrong email address");
        }

        var binId = start._id;

        userData = userData[0];

        userData.totalWaste += end.filledCapacity - start.filledCapacity;
        userData.paperCount += end.paperCount - start.paperCount;
        userData.plasticCount += end.plasticCount - start.plasticCount;
        userData.glassCount += end.glassCount - start.glassCount;
        userData.metalCount += end.metalCount - start.metalCount;
        userData.bioCount += end.bioCount - start.bioCount;

        var formula = 100/userData.totalWaste;

        userData.paperPercentage = roundToTwo(userData.paperPercentage * formula) ;
        userData.plasticPercentage =  roundToTwo(userData.plasticPercentage * formula) ;
        userData.glassPercentage = roundToTwo(userData.glassPercentage * formula) ;
        userData.metalPercentage  = roundToTwo(userData.metalPercentage * formula) ;
        userData.bioPercentage  = roundToTwo(userData.bioPercentage * formula) ;

        await UserWasteSchema.findOneAndUpdate(query, userData, {new : true});

        var wasteStatus = await ScanService.getData(binId);

        console.log(wasteStatus);

        var data = await ScanService.changeData(binId, wasteStatus);
        
        return res.send("Data updated successfully");
    
    }, 

    getUserData :  async function(email, res){
        var query = {
            email  : email
        }

        var user = await UserWasteSchema.find(query);

        return res.send(user[0]);
    }

}