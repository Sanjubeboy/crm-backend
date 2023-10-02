const mongoose = require('mongoose')

const ticketCounterSchema = new mongoose.Schema({
    name:String,
    count:Number
})

module.exports = mongoose.model('counters', ticketCounterSchema)