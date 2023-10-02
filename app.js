require('dotenv').config()
const express = require("express")
const { connectDB } = require("./db/connect")
const app = express()
const cors = require("cors")


const TicketRouter = require("./routes/tickets")
const IssueRouter = require("./routes/issues")
const UserRouter = require('./routes/users')
const AdminRouter = require('./routes/admin')

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Working...")
})

const PORT = process.env.PORT || 8800

app.use("/tickets", TicketRouter)
app.use("/issues", IssueRouter)
app.use('/user',UserRouter)
app.use('/admin', AdminRouter)  //dev endpoint

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to MONGO!")
    app.listen(PORT, () => {
      console.log(`APP running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
    console.log("Error connecting with mongoDB")
  }
}

start()
