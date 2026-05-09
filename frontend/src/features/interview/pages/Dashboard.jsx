import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";

const Dashboard = () => {
    const { reports, getReports, loading } = useInterview();
    const navigate = useNavigate();

    useEffect(() => {
        getReports();
    }, []);

    return (
        <main className="min-h-screen bg-[#1B1D1D] text-white">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-red-500">My Reports</h1>
                        <p className="text-gray-500 text-sm mt-1">All your AI-generated interview reports</p>
                    </div>
                    <button
                        onClick={() => navigate("/generate-report")}
                        className="bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer active:scale-95"
                    >
                        + New Report
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {!loading && reports.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <p className="text-lg mb-2">No reports yet</p>
                        <p className="text-sm mb-6">Generate your first AI interview report to get started</p>
                        <button
                            onClick={() => navigate("/generate-report")}
                            className="bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
                        >
                            Generate Report
                        </button>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {reports.map((report) => (
                        <div
                            key={report._id}
                            onClick={() => navigate(`/interview/${report._id}`)}
                            className="bg-[#232626] border border-[#3a3d3d] rounded-xl p-5 cursor-pointer hover:border-red-600 transition group"
                        >
                            <div className="flex justify-between items-start flex-wrap gap-3">
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Job Description</p>
                                    <p className="text-sm text-gray-300 line-clamp-2">{report.jobDescription}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-red-500">{report.matchScore}<span className="text-sm text-gray-500">%</span></p>
                                    <p className="text-xs text-gray-500">match</p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <Pill label={`${report.technicalQuestion?.length ?? 0} technical Qs`} />
                                <Pill label={`${report.behaviourQuestion?.length ?? 0} behavioural Qs`} />
                                <Pill label={`${report.skillGap?.length ?? 0} skill gaps`} />
                                <Pill label={`${report.preparationPlan?.length ?? 0} day plan`} />
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-xs text-gray-600">
                                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric", month: "short", day: "numeric"
                                    })}
                                </p>
                                <p className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition">View report →</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

const Pill = ({ label }) => (
    <span className="text-xs bg-[#1a1c1c] border border-[#3a3d3d] text-gray-400 px-3 py-1 rounded-full">
        {label}
    </span>
);

export default Dashboard;
