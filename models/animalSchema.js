const mongoose = require('mongoose');

const { Schema } = mongoose;

const animalSchema = new Schema({
    species: { type: String, required: true },
    nickName: { type: String, required: true },
    status: { type: String, required: true },
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
