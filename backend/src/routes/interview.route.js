const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');
const { generateInterviewReportController, getInterviewReportById, getAllInterviewReport } = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');
const interviewRouter = express.Router();

//generate new interview report on the basis of user self description, job description and resume
interviewRouter.post('/',authUser, upload.single("resume"), generateInterviewReportController)

//get interview report by iterview id (detail of the interview report)
interviewRouter.get('/report/:interviewId', authUser, getInterviewReportById )

// get all interview report of the loggedin user(shows the title of the interview)
interviewRouter.get('/',authUser, getAllInterviewReport)

module.exports = interviewRouter
