const express = require('express')
const { createTicket, getAllTickets, getTicketById, getTicketByNo } = require('../controllers/tickets')
const { auth } = require('../middlewares/auth')

const router = express.Router()

router.post('/createTicket', createTicket)

router.get('/getAllTickets',auth, getAllTickets)

router.get('/getTicketById/:id',auth, getTicketById)
router.get('/getTicketByNo/:no',auth, getTicketByNo)

module.exports = router