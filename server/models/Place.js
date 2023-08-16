const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, nef: 'user'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    nextGuests: Number,

});

const PlaceModel = mongoose.model('Place', placeSchema);
module.exports = PlaceModel;