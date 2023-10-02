const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.headers.authorization
  try {
    const { id, role } = jwt.verify(token.split(" ")[1], process.env.JWTSECRET)
    req.user = { id, role } //to be removed
    req.body[`${role.toLowerCase()}Id`] = id
    next()
  } catch (error) {
    res.status(401).json({ message: "unauthorized" })
  }
}

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization
  try {
    const { id, role } = jwt.verify(token.split(" ")[1], process.env.JWTSECRET)
    if(role !== 'admin'){
        res.status(401).json({message:'Unauthorized'})
    }
    req.user = { id, role } //to be removed
    req.body[`${role.toLowerCase()}Id`] = id
    next()
  } catch (error) {
    res.status(401).json({ message: "unauthorized" })
  }
}

module.exports = {auth, adminAuth}