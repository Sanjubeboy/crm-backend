const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = require('../models/user')

const signup = async (req, res) => {
  try {
    const email = req.body.email
    //checking if User already exists
    if (await user.findOne({ email: email })) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exists` })
    }
    const newUser = await user.create(req.body)
    res.json({ message: "success" })
  } catch (error) {
    //invalid req.body
    console.log(error)
    res.status(500).send(error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const User = await user.findOne({ email: email })
    //checking if User exists
    if (!User) {
      return res
        .status(400)
        .json({ message: `User with email ${email} does not exists` })
    }
    //checking whether password matches
    if (!(await bcrypt.compare(password, User.password))) {
      return res.status(400).json({ message: "Invalid password" })
    }
    const payload = { id: User._id, role: "dev" }
    //generating auth token
    const token = jwt.sign(payload, process.env.JWTSECRET)
    res.json({ message: "success", authToken: token, name: User.name })
  } catch (error) {
    //invalid req.body
    res.status(500).send(error)
  }
}


const getAllUsers = async (req, res) => {
    try {
        const users = await user.find()
        res.status(200).json({data:users})
    } catch (error) {
        res.status(500).json({message:'internal server error', error})
    }
}


module.exports = {signup, login, getAllUsers}
