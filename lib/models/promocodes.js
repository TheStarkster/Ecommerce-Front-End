const mongoose = require('mongoose')

const promocode = new mongoose.Schema({
    code: {
        type: String,
        require: true
    },
    createdfor: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    discount: {
        type: String,
        require: true
    },
})

const Promocode = mongoose.model('promocodes', promocode);
module.exports = Promocode