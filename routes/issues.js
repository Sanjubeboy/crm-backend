const express = require('express')
const {createNewIssue, linkExistingIssue, getAllIssues, getIssueById, updateIssueStatus, getIssueByNo} = require('../controllers/issues')
const { auth } = require('../middlewares/auth')
const router = express.Router()

router.post('/createNewIssue',auth, createNewIssue)
router.post('/linkExistingIssue',auth, linkExistingIssue)

router.get('/getAllIssues',auth,getAllIssues)
router.get('/getIssueById/:id',auth,getIssueById)
router.get('/getIssueByNo/:no',auth,getIssueByNo)

router.patch('/updateIssueStatus',auth, updateIssueStatus)

module.exports = router