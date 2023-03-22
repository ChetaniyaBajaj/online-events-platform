const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
    _id: {type: String},
    poster: {type: String},
    videoFilename: {type: String},
    videoFilesize: {type: Number},
    ytlink: {type: String},
    ourteamlink: {type: String}
}, { _id: false });

module.exports = mongoose.model("exhibition", exhibitionSchema)
