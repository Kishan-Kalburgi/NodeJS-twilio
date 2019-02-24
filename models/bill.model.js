const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Phone name missing']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number missing']
    },
    orderDate: {
        type: Date,
    },
    deliveryDate: {
        type: Date,
    },
    status: {
        type: String,
        trim: true,
        enum :['todo','started', 'ready', 'delivered'],
        default: 'todo'
    },
})

module.exports = mongoose.model('inventories', schema)