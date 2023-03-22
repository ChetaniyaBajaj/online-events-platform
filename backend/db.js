const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/online-events?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

// MongoDB Connection
const connectMongo = () => {
    mongoose.connect(uri, ()=> {
        console.log("connected to mongo successfully");
    })
}

module.exports = connectMongo;
