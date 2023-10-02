const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
  name: String,
  issue_no: {
    type: Number,
  },
  customer_name: {
    type: [String],
  },
  tickets: {
    type: [Number],
    default: [],
  },

  priority: {
    type: String,
    enum: ["p1", "p2", "p3"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  stage: {
    type: String,
    enum: ["pending", "In development", "closed"],
    default: "pending",
  },
})

module.exports = mongoose.model('issue',issueSchema)