const ticket = require("../models/ticket")
const counters = require("../models/ticketCounter")

const createTicket = async (req, res) => {
  try {
    const newCount = await counters.findOneAndUpdate(
      { name: "ticket" },
      { $inc: { count: 1 } }
    )
    const { name, customer_name } = req.body
    const newTicket = await ticket.create({
      name,
      customer_name,
      ticket_no: newCount.count + 1,
    })

    res.status(200).json({ data: newTicket })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticket.find()
    res.status(200).json({ data: tickets })
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
}

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params
    const newTicket = await ticket.find({ _id: id })
    if (newTicket) {
      res.status(200).json({ data: newTicket })
    }
    else{
    res.status(400).json({ data: "Ticket not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
}
const getTicketByNo = async (req, res) => {
  try {
    const { no } = req.params
    const newTicket = await ticket.find({ ticket_no: no })
    if (newTicket) {
      res.status(200).json({ data: newTicket })
    }
    else{
    res.status(400).json({ data: "Ticket not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
}

module.exports = { createTicket, getAllTickets, getTicketById, getTicketByNo }
