
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

function getUrl(){
    return url;
}

function getConnectionParams(){
    return connectionParams;
}

function getUpdateAndCreate(){
    return updateAndCreate;
}

module.exports = {getUrl, getConnectionParams, getUpdateAndCreate}
