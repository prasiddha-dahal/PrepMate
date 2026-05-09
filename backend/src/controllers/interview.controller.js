//we will receive three inputs from the frontned they are , self des, resume(pdf format), job des

const interviewReportModel = require('../models/interviewReport.model');
const generateInterviewReport = require('../services/ai.service');
const pdfParse = require('pdf-parse');

const generateInterviewReportController = async (req, res) => {
    const resumeFile = req.file
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    try {

        const interviewResponseByAi = await generateInterviewReport({ resume: resumeContent.text, selfDescription, jobDescription });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewResponseByAi
        })

        res.status(201).json({
            message: "Interview Report Generated Successfully",
            interviewReport
        })
    } catch (error) {
        console.error("Error generating interview report:", error.message);
        res.status(500).json({ message: "Failed to generate interview report. Please try again." });
    }
}

const getInterviewReportById = async (req, res) => {
    const { interviewId } = req.params;
    try {
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "interview report not found"
            })
        }

        res.status(200).json({
            message: "interview report fetched Successfully",
            interviewReport
        })


    } catch (error) {
        res.status(500).json({
            message: "Some problem occured"
        })
    }

}

const getAllInterviewReport = async (req, res) => {

    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 })
        .select("matchScore jobDescription technicalQuestions behaviourQuestions skillGap preparationPlans createdAt")

    res.status(200).json({
        message: "interview Reports fetched Successfully",
        interviewReports
    })
}


module.exports = { generateInterviewReportController, getInterviewReportById, getAllInterviewReport }
