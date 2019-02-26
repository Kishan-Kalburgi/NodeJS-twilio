const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email missing']
    },
    pwd: {
        type: String,
        required: [true, 'Password missing']
    }
})

module.exports = mongoose.model('user', schema)