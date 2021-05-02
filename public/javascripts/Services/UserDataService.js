var UserWasteSchema = require('../Models/UserWasteSchema');
var ScanService = require('./ScanService');
var Functions = require('../Functions');
const UserSchema = require('../Models/UserSchema');

function roundToTwo(num) {    
    return +(Math.round(num + "e+2") + "e-2");
}

module.exports = {

    updateData : async function(email, start, end, res){
        var query = {
            email : email,
            date: Functions.convertDate(0)
        }

        start = JSON.parse(start);
        end = JSON.parse(end);

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

        userData.paperPercentage = roundToTwo(userData.paperCount * formula) ;
        userData.plasticPercentage =  roundToTwo(userData.plasticCount * formula) ;
        userData.glassPercentage = roundToTwo(userData.glassCount * formula) ;
        userData.metalPercentage  = roundToTwo(userData.metalCount * formula) ;
        userData.bioPercentage  = roundToTwo(userData.bioCount * formula) ;

        await UserWasteSchema.findOneAndUpdate(query, userData, {new : true});
        
        var wasteStatus = await ScanService.getData(binId);

        var data = await ScanService.changeData(binId, wasteStatus);
        
        return res.send("Data updated successfully");
    
    }, 

    newDayData : async function(res){

        var users = await UserSchema.find();

        for(var i = 0;i<users.length;i++){
            var testQuery = {
                email: users[i].email,
                date: Functions.convertDate(0)
            }

            var testUserData = await UserWasteSchema.find(testQuery);
            if(testUserData.length===0){
                var query = {
                    email: users[i].email,
                    date: Functions.convertDate(-1)
                }

                var prevUserData = await UserWasteSchema.find(query);

                prevUserData = prevUserData[0];

                var newUserData = await UserWasteSchema({
                    date: Functions.convertDate(0),
                    email: users[i].email,
                    totalWaste: prevUserData.totalWaste,
                    paperCount: prevUserData.paperCount,
                    plasticCount: prevUserData.plasticCount,
                    glassCount: prevUserData.glassCount,
                    metalCount: prevUserData.metalCount,
                    bioCount: prevUserData.bioCount,
                    paperPercentage: prevUserData.paperPercentage,
                    plasticPercentage: prevUserData.plasticPercentage,
                    glassPercentage: prevUserData.glassPercentage,
                    metalPercentage: prevUserData.metalPercentage,
                    bioPercentage: prevUserData.bioPercentage,
                    days: prevUserData.days+1
                })
                newUserData.save();
            }

        }

        res.send("All Users new data created");
    },

    getUserData :  async function(email, res, days){
        var query1 = {
            email  : email,
            date : Functions.convertDate(0)
        }

        days = parseInt(days)

        var query2 = {
            email : email,
            date : Functions.convertDate(-days)
        }

        var user1 = await UserWasteSchema.find(query1);

        if(days>=user1[0].days||days<0){
            return res.send(user1[0]);
        }
        
        var user2 = await UserWasteSchema.find(query2);

        var userFinal = Functions.calculateUserData(user1[0], user2[0]);

        return res.send(userFinal);
    }

}