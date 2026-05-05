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


module.exports = { generateInterviewReportController }
