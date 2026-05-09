import { InterviewContext } from "../interview.context";
import { generateInteviewReport, getInterviewReportById, getAllInterviewsReports, logout as logoutApi } from "../services/interview.api";
import { useContext } from "react";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resume }) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInteviewReport({ jobDescription, selfDescription, resume })
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        let response = null;
        try {
            response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
        return response.interviewReport
    }

    const getReports = async () => {
        setLoading(true);
        let response = null;
        try {
            response = await getAllInterviewsReports();
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReports
    }

    const logout = async () => {
        setLoading(true);
        try {
            await logoutApi();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    return { loading, report, reports, generateReport, getReportById, getReports, logout }

}
