const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
        Resume: ${resume},
        Self Description: ${selfDescription},
        Job Description: ${jobDescription}
    `;

    const responseSchema = {
        type: "object",
        properties: {
            matchScore: {
                type: "number",
                description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
            },
            technicalQuestions: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        question: { type: "string", description: "The technical question that can be asked in the interview" },
                        intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
                        answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take" }
                    },
                    required: ["question", "intention", "answer"]
                },
                description: "Technical questions along with intention and how to answer"
            },
            behaviourQuestions: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        question: { type: "string", description: "The behavioural question that can be asked in the interview" },
                        intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
                        answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take" }
                    },
                    required: ["question", "intention", "answer"]
                },
                description: "Behavioural questions along with intention and how to answer"
            },
            skillGap: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        skill: { type: "string", description: "The skill the candidate is lacking" },
                        severity: { type: "string", enum: ["low", "medium", "high"], description: "The severity of the skill gap" }
                    },
                    required: ["skill", "severity"]
                },
                description: "List of skill gaps with severity"
            },
            preparationPlans: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        day: { type: "number", description: "Day number starting from 1" },
                        focus: { type: "string", description: "Main focus of the day" },
                        tasks: {
                            type: "Array",
                            items: { type: "string" },
                            description: "List of tasks for this day"
                        }
                    },
                    required: ["day", "focus", "tasks"]
                },
                description: "Day-wise preparation plan"
            }
        },
        required: ["matchScore", "technicalQuestions", "behaviourQuestions", "skillGap", "preparationPlans"]
    };

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema
        }
    });

    const result = JSON.parse(response.text);
    return result
}

module.exports = generateInterviewReport;
