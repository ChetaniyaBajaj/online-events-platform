const mongoose = require('mongoose');

const confSchema = new mongoose.Schema({
    _id: {type: String},
    img: {type: String},
    link: {type: String}
}, { _id: false });

module.exports = mongoose.model("conference", confSchema)
