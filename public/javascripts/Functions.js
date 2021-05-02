
const url = "mongodb+srv://sws_2:Qwerty123@cluster0.ryfqi.mongodb.net/sws?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
  }

const updateAndCreate = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2") + "e-2");
}

function getUrl(){
    return url;
}

function getConnectionParams(){
    return connectionParams;
}

function getUpdateAndCreate(){
    return updateAndCreate;
}

function convertDate(add)
{
  var date = new Date();
  date.setDate(new Date().getDate()+add);
  var mm = date.getMonth()+1; 
  var yyyy = date.getFullYear();
  var dd = date.getDate();
  if(dd<10) 
  {
      dd='0'+dd;
  }

  if(mm<10) 
  {
      mm='0'+mm;
  } 
  var convertedDate = mm + '-' + dd +'-'+ yyyy; 
  console.log(convertedDate);
  return convertedDate;
}

function calculateUserData(user1, user2){
    var calculatedUser = user1;

    calculatedUser.totalWaste = user1.totalWaste - user2.totalWaste;
    calculatedUser.paperCount = user1.paperCount - user2.paperCount;
    calculatedUser.plasticCount = user1.plasticCount - user2.plasticCount;
    calculatedUser.glassCount = user1.glassCount - user2.glassCount;
    calculatedUser.metalCount = user1.metalCount - user2.metalCount;
    calculatedUser.bioCount = user1.bioCount - user2.bioCount;
    calculateUser.days = user1.days - user2.days;

    var formula = 100/calculateUser.totalWaste;

    calculateUser.paperPercentage = roundToTwo(calculateUser.paperCount * formula) ;
    calculateUser.plasticPercentage =  roundToTwo(calculateUser.plasticCount * formula) ;
    calculateUser.glassPercentage = roundToTwo(calculateUser.glassCount * formula) ;
    calculateUser.metalPercentage  = roundToTwo(calculateUser.metalCount * formula) ;
    calculateUser.bioPercentage  = roundToTwo(calculateUser.bioCount * formula) ;

    return calculateUser;
}

module.exports = {getUrl, getConnectionParams, getUpdateAndCreate, convertDate, calculateUserData}
