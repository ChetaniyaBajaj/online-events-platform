const mongoose = require('mongoose');

const lobbySchema = new mongoose.Schema({
    _id: {type: String},
    img: {type: String},
    link: {type: String}
}, { _id: false });

module.exports = mongoose.model("lobby", lobbySchema)
