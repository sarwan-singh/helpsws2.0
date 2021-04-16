var UserWasteSchema = require('../Models/UserWasteSchema');

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

    updateData : async function(email, start, end){
        var query = {
            email : email,
            date : getCurrentDate()
        }

        var userData = UserWasteSchema.find(query);

        userData.filledCapacity += end.filledCapacity - start.filledCapacity;
        userData.paperCount += end.paperCount - start.paperCount;
        userData.plasticCount += end.plasticCount - start.plasticCount;
        userData.glassCount += end.glassCount - start.glassCount;
        userData.metalCount += end.metalCount - start.metalCount;
        userData.bioCount += end.bioCount - start.bioCount;

        var formula = 100/userData.filledCapacity;

        userData.paperPercentage = roundToTwo(userData.paperPercentage * formula) ;
        userData.plasticPercentage =  roundToTwo(userData.plasticPercentage * formula) ;
        userData.glassPercentage = roundToTwo(userData.glassPercentage * formula) ;
        userData.metalPercentage  = roundToTwo(userData.metalPercentage * formula) ;
        userData.bioPercentage  = roundToTwo(userData.bioPercentage * formula) ;

        return await UserWasteSchema.findOneAndUpdate(query, userData, {new : true});
    }

}