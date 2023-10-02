const express = require('express')
const { signup, login, getAllUsers } = require('../controllers/users')
const { adminAuth, auth } = require('../middlewares/auth')
const router = express.Router()

router.post('/signup',adminAuth, signup)
router.post('/login', login)
router.get('/getAllUsers',auth, getAllUsers)

module.exports = router