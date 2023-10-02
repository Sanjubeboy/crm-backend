const mongoose = require('mongoose')


const ticketSchema = new mongoose.Schema({
    name: String,
    ticket_no: {
        type:Number,
    },
    status: {
        type: String,
        enum: ['pending', 'In development', 'closed'],
        default: 'pending'
    },
    customer_name: String,
    issues: {
        type:[Number],
        default: []
    }

})

module.exports = mongoose.model('ticket', ticketSchema)