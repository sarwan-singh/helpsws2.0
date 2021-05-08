var UserTrackSchema = require('../Models/UserTrackSchema');

async function createNewUserTrack(email, task=undefined){
    var newUserTrack = new UserTrackSchema({
        email : email,
        recycled : task==="recycled"?1:0,
        scanned : task==="scanned"?1:0
    })

    var something = await newUserTrack.save();

    return newUserTrack;
} 

module.exports = {

    updateUserTrack : async function(email, task, res){

        var query = {
            email : email
        }

        var userTrack = await UserTrackSchema.find(query);

        if(userTrack.length===0){
            var newUser = await createNewUserTrack(email);
            return res.send(newUser);
        }else{
            userTrack = userTrack[0];

            task==="recycled"?userTrack.recycled++:userTrack.scanned++;

            await UserTrackSchema.findOneAndUpdate(query, userTrack, {new : true});

            return res.send(userTrack);
        }

    },

    
    getUserTrack : async function(email, res){

        var query = {
            email : email
        }

        var userTrack = await UserTrackSchema.find(query);

        if(userTrack.length===0){
            var newUser = await createNewUserTrack(email);
            return res.send(newUser);
        }else{
            return res.send(userTrack[0]);
        }

    }

}

