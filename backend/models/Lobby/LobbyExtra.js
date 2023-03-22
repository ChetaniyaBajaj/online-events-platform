const mongoose = require('mongoose');

const lobbyExtraSchema = new mongoose.Schema({
    _id: {type: String},
    ytlink: {type: String},
    filename: {type: String},
    filesize: {type: Number}
}, { _id: false });

module.exports = mongoose.model("lobbyvideo", lobbyExtraSchema)
