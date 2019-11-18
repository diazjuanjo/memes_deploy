const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memesSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    like: {
        type: Number,
        trim: true
    }
})

module.exports = mongoose.model('Memes', memesSchema)