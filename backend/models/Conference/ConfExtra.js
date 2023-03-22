const mongoose = require('mongoose');

const meetSchema = new mongoose.Schema({
    _id: {type: String},
    link: {type: String},
    password: {type: String}
}, { _id: false });

module.exports = mongoose.model("meeting", meetSchema)
