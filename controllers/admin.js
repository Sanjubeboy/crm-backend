const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const admin = require("../models/admin")

const adminSignup = async (req, res) => {
  try {
    const email = req.body.email
    //checking if User already exists
    if (await admin.findOne({ email: email })) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exists` })
    }
    const newUser = await admin.create(req.body)
    res.json({ message: "success" })
  } catch (error) {
    //invalid req.body
    console.log(error)
    res.status(500).send(error)
  }
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const User = await admin.findOne({ email: email })
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
    const payload = { id: User._id, role: "admin" }
    //generating auth token
    const token = jwt.sign(payload, process.env.JWTSECRET)
    res.json({ message: "success", authToken: token, name: User.name })
  } catch (error) {
    //invalid req.body
    res.status(500).send(error)
  }
}

module.exports = { adminLogin, adminSignup }
