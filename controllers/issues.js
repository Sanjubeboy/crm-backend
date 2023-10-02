const issue = require("../models/issue")
const ticket = require("../models/ticket")
const counters = require("../models/ticketCounter")

const createNewIssue = async (req, res) => {
  try {
    const { name, customer_name, priority, owner, ticket_no, ticket_id } =
      req.body
    const newCount = await counters.findOneAndUpdate(
      { name: "issue" },
      { $inc: { count: 1 } }
    )
    const newIssue = await issue.create({
      name,
      customer_name: [customer_name],
      priority,
      owner,
      tickets: [ticket_no],
      issue_no: newCount.count + 1,
    })

    if (newIssue) {
      await ticket.findOneAndUpdate(
        { _id: ticket_id },
        {
          $addToSet: { issues: newCount.count + 1 },
          status: "In development",
        }
      )
    }
    res.status(200).json({ data: newIssue })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const linkExistingIssue = async (req, res) => {
  try {
    const { ticket_id, ticket_no, issue_no, customer_name } = req.body
    console.log(customer_name)

    const updateIssue = await issue.findOneAndUpdate(
      { issue_no },
      {
        $addToSet: { tickets: ticket_no,customer_name: customer_name }
      }
    )
    console.log(updateIssue)
    if (updateIssue) {
      await ticket.findOneAndUpdate(
        { _id: ticket_id },
        {
          $addToSet: { issues: issue_no },
          status: "In development",
        }
      )
    }
    res.status(200).json({ data: updateIssue })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const getAllIssues = async (req, res) => {
  try {
    const issues = await issue.find().populate("owner",{password:0})
    res.status(200).json({ data: issues })
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
}

const getIssueById = async (req, res) => {
  try {
    const { id } = req.params
    const newIssue = await issue
      .find({ _id: id })
      .populate("owner", { password: 0 })
    if (newIssue) {
      res.status(200).json({ data: newIssue })
    }
    // res.status(400).json({ data: "Issue not found" })
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
}
const getIssueByNo = async (req, res) => {
  try {
    const { no } = req.params
    const newIssue = await issue
      .find({ issue_no: no })
      .populate("owner", { password: 0 })
    if (newIssue) {
      res.status(200).json({ data: newIssue })
    }
    // res.status(400).json({ data: "Issue not found" })
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
}

const updateIssueStatus = async (req, res) => {
  try {
    const { id, stage } = req.body
    const newIssue = await issue.findByIdAndUpdate(id, { stage })

    res.status(200).json({ data: newIssue })
  } catch (error) {
    res.status(500).json({ message: "internal server error", error })
  }
}

module.exports = {
  createNewIssue,
  linkExistingIssue,
  getAllIssues,
  getIssueById,
  updateIssueStatus,
  getIssueByNo
}
